const { get } = require('mongoose');
const User = require('../models/User');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieOptions = {
    // httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    // sameSite: 'strict',
    // path: '/'
};


async function login(req, res) {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        console.log(username,   password);
        const user = await User.findOne({ username });
        // .select('+password');
        if (!user) {
            return res.status(401).json({ message: 'user not found, Invalid credentials' });
        }
        // const isMatch = await user.comparePassword(password);
        // if (!isMatch) {
        if(user.password !== password){
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' });
        res.cookie('token', token, cookieOptions);
        res.json({ user, token });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

async function register(req, res) {

}

async function logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
}

async function getAllUser(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

async function isLoggedin(req, res) {
    res.json({ message: true });
}

const userController = {
    login, register, logout, getAllUser, isLoggedin
};



module.exports = userController;