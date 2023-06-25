const OneDeckShip = require("../models/ships/OneDeckShip")
const BoardService = require("./board-service")

class FleetService {
    fleet = []
    #oneDeckShipLimit = 4

    constructor(board) {
        this.board = board
    }

    createFleet () {
        this.createOneDeckShips(this.#oneDeckShipLimit)

        // create other
        return this.fleet
    }

    createOneDeckShips(count) {
        let ships = [] 
        for (let i = 1; i <= count; i++) {
            ships.push(new OneDeckShip(this.board.getRandomPosition()))
        }

        if (!this.checkShipsPossitions(ships)) {
            this.createOneDeckShips()
        } else {
            this.fleet.push(...ships)
            ships.forEach(ship => {
                this.board.placeShip(ship)
            });
        }

    }

    checkShipsPossitions(ships) {
        return ships.every(ship => {
            if (this.board.isFreePositionsForShipPlace(ship)) {
                return true;
            }
            return false;
        })
    }
}

module.exports = FleetService