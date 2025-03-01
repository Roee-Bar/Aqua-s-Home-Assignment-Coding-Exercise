# User Management System - Aqua Home Assignment

A simple REST API server for managing users with validation for Israeli IDs and phone numbers.

## Features

- Load users from a JSON file
- Store users in a map (key=ID, value=user object)
- Retrieve user information via REST API
- Create new users with validation
- Validate Israeli IDs and phone numbers

## Project Structure

```
├── src/
│   ├── index.js                 # Entry point
│   ├── server.js                # Express server setup
│   ├── controllers/             
│   │   └── userController.js    # Request handlers
│   ├── models/                  
│   │   └── User.js              # User model
│   ├── validators/              
│   │   └── userValidator.js     # Validation logic
│   └── data/
│       └── users.json           # Sample data
├── tests/                       
│   └── api.test.js              # API tests
└── package.json
```

## Requirements

- Node.js (v14 or higher)
- npm

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/user-management-system.git
cd user-management-system

# Install dependencies
npm install
```

## Running the Server

```bash
# Start the server
npm start

# Development mode with auto-reload
npm run dev
```

The server runs at: http://localhost:3000

## API Endpoints

### GET /users
Returns a list of all usernames.

### GET /users/:name
Returns detailed information about a specific user.

### POST /users
Creates a new user with validation for Israeli ID and phone number.

Example request body:
```json
{
  "id": "304687148",
  "name": "Jacob Cohen",
  "phone": "0541234567",
  "address": "100 Jaffa Street, Jerusalem"
}
```

## Running Tests

```bash
npm test
```

## Setup on Linux

```bash
# Install Node.js and npm
sudo apt update
sudo apt install nodejs npm

# Clone and install
git clone https://github.com/yourusername/user-management-system.git
cd user-management-system
npm install

# Run the server
npm start
```