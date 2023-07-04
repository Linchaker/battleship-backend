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

  
    let userGame;
    let oponentGame;
    if (user._id.equals(game.ownerUserId)) {
      userGame = game.data.ownerData
      oponentGame = game.data.oponentData
    } else if (user._id.equals(game.oponentUserId)) {
      userGame = game.data.oponentData
      oponentGame = game.data.ownerData
    } else {
      throw new Error('Game not found')
    }

    const oponentBoard = new BoardService(
      new Board(oponentGame.board.size, 
        new Set(oponentGame.board.hits.map(item => JSON.stringify(item))),
        new Set(oponentGame.board.occupied.map(item => JSON.stringify(item)))
      )
    )
    oponentBoard.setFleet(oponentGame.fleet)

    if (!oponentBoard.board.isHit(position)) {
      oponentBoard.board.recordHit(position)
      oponentBoard.checkShipHit(position)

      oponentGame = {
        board: oponentBoard.getBoard(),
        fleet: oponentBoard.getFleet()
      }


      if (user._id.equals(game.ownerUserId)) {
        game.data.ownerData = userGame
        game.data.oponentData = oponentGame
      } else if (user._id.equals(game.oponentUserId)) {
        game.data.oponentData = userGame
        game.data.ownerData = oponentGame
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