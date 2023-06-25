const express = require('express');
const {registerValidators} = require('../utils/validators')
const AuthController = require('../controllers/api/AuthController');
const PlayController = require('../controllers/api/PlayController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({"api": true})
});
router.post('/auth/login', AuthController.login);
router.post('/auth/register', registerValidators, AuthController.register);


router.get('/play/create', authMiddleware, PlayController.createGame);
// temp without middleware router.get('/play/create', PlayController.createGame);

module.exports = router;