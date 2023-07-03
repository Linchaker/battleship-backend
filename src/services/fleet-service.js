const OneDeckShip = require("../models/ships/OneDeckShip")
const FewDeckShip = require("../models/ships/FewDeckShip")
const BoardService = require("./board-service")

class FleetService {
    fleet = []
    #oneDeckShipLimit = 4
    #twoDeckShipLimit = 3
    #threeDeckShipLimit = 2
    #fourDeckShipLimit = 1

    constructor(board) {
        this.board = board
    }

    setFleet(fleet) {
        this.fleet = fleet
        return this.fleet
    }

    createFleet () {
        this.createOneDeckShips(this.#oneDeckShipLimit)
        this.createFewDeckShips(2, this.#twoDeckShipLimit)
        this.createFewDeckShips(3, this.#threeDeckShipLimit)
        this.createFewDeckShips(4, this.#fourDeckShipLimit)

        return this.fleet
    }

    createOneDeckShips(count) {
        for (let i = 1; i <= count; i++) {
            let ship = new OneDeckShip(this.board.getRandomPosition())
            if (this.checkShipsPossitions([ship])) {
                this.fleet.push(ship)
                this.board.placeShip(ship)
            } else {
                i--
            }
        }

    }

    createFewDeckShips(size, count) {
        for (let i = 1; i <= count; i++) {
            let ship = new FewDeckShip(size, this.board.getRandomPosition(), this.board.getRandomOrientation())
            if (this.checkShipsPossitions([ship])) {
                this.fleet.push(ship)
                this.board.placeShip(ship)
            } else {
                i--
            }
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