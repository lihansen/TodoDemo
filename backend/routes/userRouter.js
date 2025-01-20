const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/', userController.getAllUser);
router.get('/isloggedin', auth, userController.isLoggedin);
module.exports = router;
