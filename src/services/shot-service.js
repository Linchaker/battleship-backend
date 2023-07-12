const { mongoose } = require("mongoose")
const Board = require("../models/Board")
const Game = require("../models/Game")
const BoardService = require("./board-service")

async function shotHandler(user, gameId, position) {
  try {
    if (!gameId || !mongoose.Types.ObjectId.isValid(gameId)) {
      throw new Error('Game not found')
    }

    const game = await Game.findById(gameId);

    if (!game) {
      throw new Error('Game not found')
    }

    if (!user._id.equals(game.ownerUserId) && !user._id.equals(game.oponentUserId)) {
      throw new Error('Game not found')
    }

    const isOwner = user._id.equals(game.ownerUserId);
    let userGame = isOwner ? game.data.ownerData : game.data.oponentData
    let oponentGame = isOwner ? game.data.oponentData : game.data.ownerData


    const oponentBoard = new BoardService(
      new Board(oponentGame.board.size, 
        new Set(oponentGame.board.hits.map(item => JSON.stringify(item))),
        new Set(oponentGame.board.occupied.map(item => JSON.stringify(item)))
      )
    )
    oponentBoard.setFleet(oponentGame.fleet)

    if (!oponentBoard.board.isHit(position)) {
      oponentBoard.board.recordHit(position)
      const isHitShip = oponentBoard.checkShipHit(position)

      oponentGame = {
        board: oponentBoard.getBoard(),
        fleet: oponentBoard.getFleet()
      }

      game.data.ownerData = isOwner ? userGame : oponentGame;
      game.data.oponentData = isOwner ? oponentGame : userGame;

      if (!isHitShip) {
        game.nextMoveUserId = isOwner ? game.oponentUserId : game.ownerUserId;
      }


      await game.save()
    }    
    
    return {game}    
    
  } catch (e) {
    console.log(e)
    throw new Error('Shot error')
  }
}

module.exports = {shotHandler}