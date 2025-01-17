// src/middleware/index.js

// Middleware function to log requests
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// Middleware function to handle 404 errors
const notFound = (req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
};

// Middleware function to handle errors
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
};

module.exports = {
    logger,
    notFound,
    errorHandler
};