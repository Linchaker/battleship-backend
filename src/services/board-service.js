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

    setFleet(fleet) {
        this.fleet = this.fleetService.setFleet(fleet)
    }

    getBoard() {
        return {
          ...this.board,
          hits: Array.from(this.board.hits).map(item => JSON.parse(item)),
          occupied: Array.from(this.board.occupied).map(item => JSON.parse(item))
        };
      }

    getFleet() {
        return this.fleet
    }

    checkShipHit(position) {
        for (const ship of this.fleet) {
          for (const deck of ship.state) {
            if (deck.position.x === position.x && deck.position.y === position.y) {
              deck.status = false;
              if (this.isShipDestroy(ship)) {
                this.board.recordHistAroundDestroyedShip(ship)
                ship.status = false;
              }
              return true; // Попали в корабль
            }
          }
        }

        return false; // Не попали в корабль
    }

    isShipDestroy(ship) {
      return ship.state.every(deck => {
        const { status } = deck;
        return !status;
      });
    }

    isFleetDestroyed() {
      return this.fleet.every((ship) => {
          return ship.status === false
      })
    }

}
  
module.exports = BoardService