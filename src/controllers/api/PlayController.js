const { mongoose } = require("mongoose")
const Board = require("../../models/Board")
const Game = require("../../models/Game")
const BoardService = require("../../services/board-service")

class PlayController {
  async createGame(req, res) {
    try {

      const ownerBoard = new BoardService(new Board(10))
      ownerBoard.createFleet()
    
     
      const game = new Game({
        ownerUserId: req.user._id,
        data: {
          ownerData: {
            board: ownerBoard.getBoard(),
            fleet: ownerBoard.getFleet()
          }
        }
      })

      await game.save()

      

      // res.json({
      //   "success": true,
      //   "ownerBoard": ownerBoard.getBoard(),
      //   "ownerFleet": ownerBoard.getFleet(),
      // })
      res.json({
        "success": true,
        "game": game,
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Create game error'})
    }
  }

  async getGame(req, res) {
    try {
      let gameId = req.params.gameId
  
      if (!gameId || !mongoose.Types.ObjectId.isValid(gameId)) {
        res.status(404).json({message: 'Game not found'})
        return
      }


      const game = await Game.findById(gameId);

      if (!game) {
        res.status(404).json({message: 'Game not found'})
        return
      }


      if (req.user._id !== game.ownerUserId && !game.oponentUserId) {
        game.oponentUserId = req.user._id

        const oponentBoard = new BoardService(new Board(10))
        oponentBoard.createFleet()

        game.data.oponentData = {
          board: oponentBoard.getBoard(),
          fleet: oponentBoard.getFleet()
        }

        await game.save()
      }
      
  
      if (req.user._id.equals(game.ownerUserId) || req.user._id.equals(game.oponentUserId)) {
        res.json({
          "success": true,
          "game": game,
        })
        return
      } else {
        res.status(404).json({message: 'Game not found'})
        return
      }

       // создвать если нету для опонента доску и флот
       // в дальнейшем можено будет вырезать флот противника, доску оставляем чтобы показать куда уже стреляли
       // и добавить хитам статус попадания, либо одельный массив подбитых кораблей

      
      
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Get game error'})
    }
  }
}

module.exports = new PlayController