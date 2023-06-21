const Game = require("../../models/Game")
const FleetService = require("../../services/fleet-service")

class PlayController {
  async createGame(req, res) {
    try {

      const Fleet = FleetService.createFleet()     
     
      // const game = new Game({
      //  // ownerUserId: req.user._id,
      //   ships: {
      //     owner: Fleet
      //   }
      // })

      

      res.json({
        "success": true,
        "Fleet": Fleet
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Create game error'})
    }
  }
}

module.exports = new PlayController