const { mongoose } = require("mongoose")
const Game = require("../models/Game")

async function setReadyHandler(user, gameId) {
  try {
    if (!gameId || !mongoose.Types.ObjectId.isValid(gameId)) {
      throw new Error('Game not found')
    }

    const game = await Game.findById(gameId);

    if (!game) {
      throw new Error('Game not found')
    }

    if (user._id.equals(game.ownerUserId)) {
      game.ownerStatus = 'ready'
    } else if (user._id.equals(game.oponentUserId)) {
      game.oponentStatus = 'ready'
    } else {
      throw new Error('Game not found')
    }

    if (game.oponentStatus === 'ready' && game.ownerStatus === 'ready') {
      game.status = 'started'
    }


    await game.save()
    
    return {game}    
    
  } catch (e) {
    console.log(e)
    throw new Error('setReadyHandler error')
  }
}

module.exports = {setReadyHandler}