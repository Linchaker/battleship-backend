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
}

module.exports = new PlayController