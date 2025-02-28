# User Management System - Aqua Home Assignment

A simple server system for managing users with validation for Israeli IDs and phone numbers.

## Features

- Load users from a JSON file
- Store users in a map (key=ID, value=user object)
- Retrieve user information using REST API endpoints
- Create new users with validation

## Project Structure

```
Aqua HWA/
├── src/
│   ├── index.js          # Main entry point
│   ├── server.js         # Express server setup
│   ├── controllers/      # Request handlers
│   │   └── userController.js
│   ├── models/           # Data models
│   │   └── User.js
│   ├── validators/       # Input validation
│   │   └── userValidator.js
│   └── data/
│       └── users.json    # Sample data
├── tests/                # Test files
│   └── api.test.js
├── package.json
└── README.md             # Documentation and setup instructions
```

## System Requirements

- Node.js (version 14 or higher)
- npm (Node.js package manager)

## Installation

```bash
# Clone the repository
git clone https://github.com/Roee-Bar/Aqua-s-Home-Assignment-Coding-Exercise.git
cd Aqua-s-Home-Assignment-Coding-Exercise

# Install dependencies
npm install
```

## Running the Server

```bash
# Run the server
npm start

# Run the server in development mode (with auto-reload)
npm run dev
```

The server will run at: http://localhost:3000

## API Endpoints

- `GET /users` - Get all usernames
- `GET /users/:name` - Get user information by name
- `POST /users` - Create a new user

## Data Validation

The system validates:
- Israeli ID numbers (9 digits with check digit validation)
- Israeli phone numbers (formats: 05X-XXXXXXX, 05X XXXXXXX, 05XXXXXXXX)

## Running Tests

```bash
npm test
```

## Setup Instructions for Linux

```bash
# Install Node.js and npm
sudo apt update
sudo apt install nodejs npm

# Verify installation
node -v
npm -v

# Clone repository and install dependencies
git clone https://github.com/Roee-Bar/Aqua-s-Home-Assignment-Coding-Exercise.git
cd Aqua-s-Home-Assignment-Coding-Exercise
npm install

# Run the server
npm start
```

## Setup Instructions for Windows

```powershell
# Install Node.js and npm from https://nodejs.org/

# Verify installation
node -v
npm -v

# Clone repository and install dependencies
git clone https://github.com/Roee-Bar/Aqua-s-Home-Assignment-Coding-Exercise.git
cd Aqua-s-Home-Assignment-Coding-Exercise
npm install

# Run the server
npm start
```