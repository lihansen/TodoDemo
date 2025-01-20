const mongoose = require('mongoose');
const User = require('./models/User');
const Todo = require('./models/Todo');
const connectDB = require('./config/db');
require('dotenv').config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Todo.deleteMany({});

        // Create test users
        const users = await User.create([
            {
                username: 'admin',
                email: 'admin@example.com',
                password: 'admin123'
            },
            {
                username: 'john',
                email: 'john@example.com',
                password: 'john123'
            },
            {
                username: 'jane',
                email: 'jane@example.com',
                password: 'jane123'
            }
        ]);

        // Create todos for users
        const todos = await Todo.create([
            {
                title: 'Complete React Project',
                user: users[0]._id,
                completed: false
            },
            {
                title: 'Learn MongoDB',
                user: users[0]._id,
                completed: true
            },
            {
                title: 'Study Express.js',
                user: users[1]._id,
                completed: false
            },
            {
                title: 'Finish Documentation',
                user: users[1]._id,
                completed: true
            },
            {
                title: 'Setup CI/CD Pipeline',
                user: users[2]._id,
                completed: false
            },
            {
                title: 'Code Review',
                user: users[2]._id,
                completed: true
            }
        ]);

        console.log('Data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

module.exports = seedData;