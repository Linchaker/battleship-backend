class BoardService {
    getRandomPosition() {
      const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
  
      return {
        x: getRandomInt(1, 10),
        y: getRandomInt(1, 10),
      };
    }
  }
  
  module.exports = new BoardService