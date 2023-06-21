const OneDeckShip = require("../models/ships/OneDeckShip")
const BoardService = require("./board-service")

class FleetService {
    fleet = []
    createFleet () {
        this.createOneDeckShips()

        return {'fleet': this.fleet}
    }

    createOneDeckShips() {
        for (let i = 1; i <= 4; i++) {
            this.fleet.push(new OneDeckShip(BoardService.getRandomPosition()))
        }
    }
}

module.exports = new FleetService