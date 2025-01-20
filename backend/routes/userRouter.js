const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const express = require('express');

const router = express.Router();

// router.post('/register', userController.register);
// router.get('/', userController.getAllUser);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/isloggedin', auth, userController.isLoggedin);
module.exports = router;
