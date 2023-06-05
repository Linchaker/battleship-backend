const express = require('express');
const {registerValidators} = require('../utils/validators')
const AuthController = require('../controllers/api/AuthController');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({"api": true})
});
router.post('/auth/login', AuthController.login);
router.post('/auth/register', registerValidators, AuthController.register);

module.exports = router;