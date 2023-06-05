const User = require('../models/User')
const { decodeToken } = require('../utils/token')

module.exports = async function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "User is not authorized"
            })
        }
        const decodedData = decodeToken(token)
        req.user = await User.findById(decodedData.user._id)
        next()
    } catch (e) {
        console.log(e);
        return res.status(403).json({
            success: false,
            message: "User is not authorized"
        })
    }
  }