const Ship = require("./Ship")

class FewDeckShip extends Ship {

    constructor(size, position, orientation) {        
        super(size, orientation, position);
    }
}

module.exports = FewDeckShip