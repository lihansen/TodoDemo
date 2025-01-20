const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const seedData = require('./seeds');
// const routes = require('./routes/todoRouters');
// const middleware = require('./middleware/index');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
// CORS middleware setup
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization']
}))
// Routes setup
app.use('/tasks', require('./routes/todoRouters'));
app.use('/users', require('./routes/userRouter'));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

// Start the server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

startServer();