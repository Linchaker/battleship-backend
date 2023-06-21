const { exists } = require("../Game");

class Ship {
    // 1-4 decks
    size;
    
    // x (horizontal) or y (vertical)
    orientation;
    
    // "x:y" coordinate on board, of beginning of the ship
    // Board map from 1:1 to 10:10
    position;


    // [{deck: 1, position: "1:1", status: true}]
    state = [];

    // bool - ship ok or destroy
    status = true;


    constructor(size, orientation, position) {
        this.size = size;
        this.orientation = orientation;
        this.position = position;

        this.setState()
    }

    setState() {
        for (let i = 0; i < this.size; i++) {
            let pos = { ...this.position };
            let state = {
                deck: i + 1, 
                position: this.shiftPosition(pos, i),
                status: true
            }
                        
            this.state.push(state)
        }
    }

    shiftPosition(position, step)
    {
        position[this.orientation] += step
        return position
    }
}

module.exports = Ship