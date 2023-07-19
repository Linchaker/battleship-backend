const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    provider: {
        type: String,
        default: 'local'
    }
})

module.exports = model('User', userSchema)