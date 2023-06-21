const Ship = require("./Ship")

class OneDeckShip extends Ship {

    constructor(position) {
        let size = 1;
        let orientation = 'x';
    
        super(size, orientation, position);
    }
}

module.exports = OneDeckShip