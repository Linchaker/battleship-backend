class PlayController {
  async createGame(req, res) {
    try {
        res.json({
          "success": true,
          "gameId": "123qwe123qwe123qwe"
        })
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Create game error'})
    }
  }
}

module.exports = new PlayController