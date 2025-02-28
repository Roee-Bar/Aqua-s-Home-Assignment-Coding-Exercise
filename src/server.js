const express = require('express');
const path = require('path');
const userController = require('./controllers/userController');

const app = express();

app.use(express.json());

const dataFilePath = path.join(__dirname, 'data', 'users.json');

userController.loadUsers(dataFilePath);

app.get('/users', userController.getAllUsernames);
app.get('/users/:name', userController.getUserByName);
app.post('/users', userController.createUser);

module.exports = app;