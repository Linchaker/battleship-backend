const User = require('../../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../../utils/token');

class AuthController {
  async login(req, res) {
    try {
      const {email, password} = req.body
      const candidate = await User.findOne({ email })
  
      if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password)
  
        if (areSame) {
          const token = generateAccessToken(candidate.toObject());
          res.json({user: candidate.toObject(), token})
        } else {
          res.status(422).json({'errors': [{path: 'email', msg: 'Wrong email or password'}]})
        }
      } else {
        res.status(422).json({'errors': [{path: 'email', msg: 'User not exists'}]})
      }
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Login error'})
    }
  }

  async register(req, res) {
    try {
      const {email, password, name} = req.body
  
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({'errors': errors.array()})
      }
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email, name, password: hashPassword
      })
      await user.save()
      const token = generateAccessToken(user.toObject());
      res.json({user: user.toObject(), token})
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Registration error'})
    }
  }
}

module.exports = new AuthController