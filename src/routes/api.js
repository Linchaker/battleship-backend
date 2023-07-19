const express = require('express');
const {registerValidators} = require('../utils/validators')
const AuthController = require('../controllers/api/AuthController');
const AuthGoogleController = require('../controllers/api/AuthGoogleController');
const PlayController = require('../controllers/api/PlayController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({"api": true})
});
router.post('/auth/login', AuthController.login);
router.post('/auth/register', registerValidators, AuthController.register);
router.get('/oauth/google', AuthGoogleController.googleOauthHandler);


// router.get('/play', PlayController.createGame);
router.post('/play', authMiddleware, PlayController.createGame);
router.post('/play/shot', authMiddleware, PlayController.shot);
router.get('/play/:gameId?', authMiddleware, PlayController.getGame);
// temp without middleware router.get('/play/create', PlayController.createGame);

module.exports = router;