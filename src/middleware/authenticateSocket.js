const User = require('../models/User')
const { decodeToken } = require('../utils/token')

const authenticateSocket = async (socket, next) => {
    try {
      const token = socket.handshake.auth.token.split(' ')[1]
      if (!token) {
        throw new Error('User is not authorized');
      }
  
      const decodedData = decodeToken(token)
      socket.user = await User.findById(decodedData.user._id)
      next();
    } catch (error) {
      // Ошибка аутентификации
      next(new Error(error.message));
    }
  };

module.exports = {authenticateSocket}