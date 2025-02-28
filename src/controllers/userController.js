const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { isValidIsraeliID, isValidIsraeliPhone } = require('../validators/userValidator');

const users = new Map();

function loadUsers(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const usersArray = JSON.parse(data);
    
    usersArray.forEach(userData => {
      const user = User.fromJSON(userData);
      if (user.isValid()) {
        users.set(user.id, user);
      } else {
        console.log(`Invalid user: ${user.name}`);
      }
    });
    
    console.log(`Loaded ${users.size} valid users`);
    return users;
  } catch (err) {
    console.error('Error loading users:', err);
    throw err;
  }
}

function getAllUsernames(req, res) {
  const usernames = Array.from(users.values()).map(user => user.name);
  res.json(usernames);
}

function getUserByName(req, res) {
  const userName = req.params.name;
  const user = Array.from(users.values()).find(u => u.name === userName);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

function createUser(req, res) {
  const userData = req.body;
  
  if (!isValidIsraeliID(userData.id)) {
    return res.status(400).json({ error: 'Invalid Israeli ID' });
  }
  
  if (!isValidIsraeliPhone(userData.phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }
  
  const user = User.fromJSON(userData);
  users.set(user.id, user);
  res.status(201).json(user);
}

module.exports = {
  loadUsers,
  getAllUsernames,
  getUserByName,
  createUser,
  users
};