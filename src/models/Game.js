const {Schema, model} = require('mongoose')

const userStatuses = ['not_ready', 'ready', 'loser', 'winner']

const gameSchema = new Schema({
    ownerUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    oponentUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    status: {
        type: String,
        enum: ['not_started', 'started', 'ended'],
        default: 'not_started',
    },
    ownerStatus: {
        type: String,
        enum: userStatuses,
        default: 'not_ready',
    },
    oponentStatus: {
        type: String,
        enum: userStatuses,
        default: 'not_ready',
    },
    data: {
        ownerData: {
            type: Object,
            required: true,
        },
        oponentData: {
            type: Object,
            required: false,
          },
      },
})

module.exports = model('Game', gameSchema)


