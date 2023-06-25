const FleetService = require('./fleet-service')

class BoardService {
    fleet = []
    constructor(board) {
        this.board = board
        this.fleetService = new FleetService(this.board)
    }

    createFleet() {
        this.fleet = this.fleetService.createFleet()
    }

   

    getBoard() {
        return {
          ...this.board,
          hits: [...this.board.hits],
          occupied: [...this.board.occupied]
        };
      }

    getFleet() {
        return this.fleet
    }

}
  
module.exports = BoardService