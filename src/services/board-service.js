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
          hits: [...this.board.hits],
          occupied: [...this.board.occupied]
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

    

}
  
module.exports = BoardService