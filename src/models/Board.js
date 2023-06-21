class Board {
    constructor(size) {
        this.size = size;
        // Множество координат попаданий
        this.hits = new Set();
        // Множество занятых координат кораблей
        this.occupied = new Set();
    }
  
    isOccupied(position) {
        const { x, y } = position;
        return this.occupied.has(JSON.stringify({ x, y }));
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
        ship.forEach(deck => {
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
  }

module.exports = Board