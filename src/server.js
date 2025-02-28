const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');

// Create Express application
const app = express();

// Middleware
app.use(express.json());

// Path to data file
const dataFilePath = path.join(__dirname, 'data', 'users.json');

// Load users
userController.loadUsers(dataFilePath);

// Define API routes
app.get('/users', userController.getAllUsernames);
app.get('/users/:name', userController.getUserByName);
app.post('/users', userController.createUser);

module.exports = app;