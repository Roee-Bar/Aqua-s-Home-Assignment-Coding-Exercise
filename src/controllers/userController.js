const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { isValidIsraeliID, isValidIsraeliPhone } = require('../validators/userValidator');

const users = new Map();

// Loads users from JSON file, Validates each user and adds valid users to Map.
function loadUsers(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found at path ${filePath}`);
      return users;
    }

    const data = fs.readFileSync(filePath, 'utf8');
    
    try {
      const usersArray = JSON.parse(data);
      
      usersArray.forEach(userData => {
        if (!userData.id || !userData.name || !userData.phone || !userData.address) {
          console.log(`Skipping user with missing required fields: ${JSON.stringify(userData)}`);
          return;
        }

        if (typeof userData.id !== 'string' || typeof userData.name !== 'string' || 
            typeof userData.phone !== 'string' || typeof userData.address !== 'string') {
          console.log(`Skipping user with invalid field types: ${JSON.stringify(userData)}`);
          return;
        }

        const user = User.fromJSON(userData);
        if (user.isValid()) {
          users.set(user.id, user);
        } else {
          console.log(`Invalid user: ${user.name} - Failed validation checks`);
        }
      });
      
      console.log(`Loaded ${users.size} valid users`);
      return users;
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      return users;
    }
  } catch (err) {
    console.error('Error loading users:', err);
    return users;
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

// Creates new user & Validates Israeli ID and phone number.
function createUser(req, res) {
  const userData = req.body;
  
  if (!userData.id || !userData.name || !userData.phone || !userData.address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (typeof userData.id !== 'string' || typeof userData.name !== 'string' || 
      typeof userData.phone !== 'string' || typeof userData.address !== 'string') {
    return res.status(400).json({ error: 'Invalid field types' });
  }
  
  if (!isValidIsraeliID(userData.id)) {
    return res.status(400).json({ error: 'Invalid Israeli ID' });
  }
  
  if (!isValidIsraeliPhone(userData.phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  if (users.has(userData.id)) {
    return res.status(409).json({ error: 'User with this ID already exists' });
  }

  const existingUserWithSameName = Array.from(users.values()).find(u => u.name === userData.name);
  if (existingUserWithSameName) {
    return res.status(409).json({ error: 'User with this name already exists' });
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