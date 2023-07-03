class Board {
    constructor(size, hits = new Set(), occupied = new Set()) {
        this.size = size;
        this.hits = hits;
        this.occupied = occupied;
      }
  
    isOccupied(position) {
        const { x, y } = position;
        return this.occupied.has(JSON.stringify({ x, y }));
    }

    isFreePositionsForShipPlace(ship) {
        return ship.state.every(deck => {
          const { position } = deck;
          const { x, y } = position;
    
          if (x > 0 && y > 0 && x <= this.size && y <= this.size) {
            return !this.isOccupied(position)
          }
          return false;
        });
      }
  
    isHit(position) {
        const { x, y } = position;
        return this.hits.has(JSON.stringify({ x, y }));
    }
  
    recordHit(position) {
        const { x, y } = position;
        if (x > 0 && y > 0 && x <= this.size && y <= this.size) {
            this.hits.add(JSON.stringify({ x, y }));
        }
    }
  
    placeShip(ship) {
        ship.state.forEach(deck => {
            const { position } = deck;
            const { x, y } = position;

            if (x > 0 && y > 0 && x <= this.size && y <= this.size) {
                this.occupied.add(JSON.stringify({ x, y }));
                // Учет клеток вокруг корабля
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                    const adjacentX = x + dx;
                    const adjacentY = y + dy;

                    if (adjacentX > 0 && adjacentY > 0 && adjacentX <= this.size && adjacentY <= this.size) {
                        this.occupied.add(JSON.stringify({ x: adjacentX, y: adjacentY }));
                    }
                    }
                }
            }
        });
    }

    getRandomPosition(onlyFree = true) {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        let pos = {
            x: getRandomInt(1, this.size),
            y: getRandomInt(1, this.size),
        }
        if (onlyFree && this.isOccupied(pos)) {
            return this.getRandomPosition(onlyFree)
        } else {
            return pos
        }
    }

    getRandomOrientation() {
        return Math.random() < 0.5 ? 'x' : 'y';
    }
  }

module.exports = Board