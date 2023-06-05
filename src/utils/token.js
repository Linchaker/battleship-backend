const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

const generateAccessToken = (user) => {
    delete user.password
    
    const payload = {
        user: user
    }
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});
}

const decodeToken = (token) => {    
    return jwt.verify(token, JWT_SECRET);
}


module.exports = {generateAccessToken, decodeToken}