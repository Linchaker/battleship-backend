const User = require('../../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')

class AuthController {
  async login(req, res) {
    try {
      const {email, password} = req.body
      const candidate = await User.findOne({ email })
  
      if (candidate) {
        const areSame = await bcrypt.compare(password, candidate.password)
  
        if (areSame) {
          res.json({"login": true})
        } else {
          res.json({'loginError': 'Wrong email or password'}).status(422)
        }
      } else {
        res.json({'loginError': 'User not exists'}).status(422)
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
        return res.json({'registerError': errors.array()[0].msg}).status(422)
      }
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email, name, password: hashPassword
      })
      await user.save()
      res.json({user: user}).status(200)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Registration error'})
    }
  }
}

module.exports = new AuthController