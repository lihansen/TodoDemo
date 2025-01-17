// src/config/config.js

const dotenv = require('dotenv');

dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
};

module.exports = config;