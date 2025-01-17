const express = require('express');
const app = express();
const routes = require('./routes/index');
const middleware = require('./middleware/index');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware);

// Routes setup
app.use('/api', routes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;