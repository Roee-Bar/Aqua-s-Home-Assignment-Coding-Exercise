const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { isValidIsraeliID, isValidIsraeliPhone } = require('../validators/userValidator');

// User repository - map where the key is the ID
const users = new Map();

/**
 * Loads users from a JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {Map} - The users map
 */
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

/**
 * Get all usernames
 * @param {object} req - HTTP request
 * @param {object} res - HTTP response
 */
function getAllUsernames(req, res) {
  const usernames = Array.from(users.values()).map(user => user.name);
  res.json(usernames);
}

/**
 * Get a user by name
 * @param {object} req - HTTP request
 * @param {object} res - HTTP response
 */
function getUserByName(req, res) {
  const userName = req.params.name;
  const user = Array.from(users.values()).find(u => u.name === userName);
  
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}

/**
 * Create a new user
 * @param {object} req - HTTP request
 * @param {object} res - HTTP response
 */
function createUser(req, res) {
  const userData = req.body;
  
  // Validate ID
  if (!isValidIsraeliID(userData.id)) {
    return res.status(400).json({ error: 'Invalid Israeli ID' });
  }
  
  // Validate phone
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