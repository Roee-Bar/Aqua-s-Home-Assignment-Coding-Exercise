# User Management System - Aqua Home Assignment

A simple server system for managing users with validation for Israeli IDs and phone numbers.

## Project Overview

This project is a RESTful API server for user management, specifically designed to handle Israeli user data with proper validation for Israeli IDs and phone numbers. The system allows loading users from a JSON file, storing them in memory, retrieving user information, and creating new users - all while ensuring data validity.

## System Architecture

The project follows an MVC-like architecture:

1. **Models** - Define data structures and business logic
2. **Controllers** - Handle HTTP requests and responses
3. **Validators** - Implement validation rules for user data
4. **Server** - Sets up Express routes and middleware

## Development Principles

This project implements several important software development principles:

1. **Modular Architecture** - The codebase is organized using an MVC-like pattern, separating data models, controllers, and validators into distinct modules.

2. **Single Responsibility Principle** - Each component has a clear, well-defined responsibility (e.g., User model manages user data, userValidator handles validation logic).

3. **RESTful API Design** - The API follows REST conventions with appropriate HTTP methods (GET for retrieving data, POST for creating resources).

4. **Data Validation** - The system implements thorough validation for critical data like Israeli ID numbers and phone numbers.

5. **Error Handling** - Proper error responses with appropriate HTTP status codes and informative messages.

6. **Automated Testing** - Comprehensive tests that verify both successful operations and proper handling of invalid inputs.

## Technologies Used

This project leverages several modern technologies and libraries:

### Core Technologies
- **Node.js** - JavaScript runtime environment for server-side code execution
- **Express.js** - Web framework for building the RESTful API with middleware support
- **JavaScript (ES6+)** - Modern JavaScript features for cleaner, more maintainable code

### Data Management
- **Map Object** - In-memory data structure for efficient O(1) user lookups by ID
- **JSON** - Data format for both storage (users.json) and API communication
- **fs Module** - Node.js built-in module for file system operations

### Validation & Testing
- **RegExp** - Regular expressions for Israeli ID and phone number validation
- **Jest** - Testing framework for unit and integration tests
- **Supertest** - HTTP testing library for API endpoint testing

### Development Tools
- **npm** - Package manager for dependency management and script execution
- **Nodemon** - Development utility that monitors for changes and restarts the server

These technologies were chosen to create a modular, maintainable, and efficient system for managing user data with proper validation for Israeli-specific formats.

## Data Flow

### Application Startup

When the application starts:

1. `index.js` imports the Express app from `server.js` and starts the server on port 3000
2. `server.js` sets up Express middleware and routes
3. The server loads users from `users.json` via the `userController.loadUsers()` function
4. Valid users are stored in a Map where the key is the user's ID

### Loading Users

The user loading process:

1. `userController.loadUsers()` reads the JSON file
2. It parses each user object and creates User model instances
3. Each user is validated using the `isValid()` method from the User model
4. Valid users are stored in the Map, invalid users are logged but skipped

### API Endpoints Flow

#### GET /users
1. Client sends a GET request to `/users`
2. `userController.getAllUsernames()` is called
3. The controller extracts all user names from the users Map
4. Returns a JSON array of usernames with 200 status code

#### GET /users/:name
1. Client sends a GET request to `/users/[username]`
2. `userController.getUserByName()` is called with the username parameter
3. The controller searches for a user with the matching name
4. If found, returns the user object with 200 status code
5. If not found, returns a 404 error response

#### POST /users
1. Client sends a POST request to `/users` with user data in the request body
2. `userController.createUser()` is called with the request data
3. The ID and phone number are validated using the validator functions
4. If validation fails, returns a 400 error with an appropriate message
5. If validation succeeds, creates a new User object and adds it to the Map
6. Returns the created user with 201 status code
7. If a user with the same ID already exists, returns a 409 conflict error
8. If a user with the same name already exists, returns a 409 conflict error

## Validation Logic

### Israeli ID Validation
1. Checks if the ID is exactly 9 digits
2. Applies the Luhn algorithm specific to Israeli IDs:
   - For each digit in an odd position, multiply by 1
   - For each digit in an even position, multiply by 2 (if result > 9, subtract 9)
   - Sum all results
   - The sum must be divisible by 10

### Israeli Phone Validation
1. Validates phone numbers match Israeli formats:
   - Standard format: 05X-XXXXXXX or 05XXXXXXXX (10 digits starting with 05)
   - International format with leading 972: 
     - 972-5X-XXXXXXX (12 digits, with 0 after country code)
     - 9725XXXXXXXX (11 digits, without 0 after country code)
2. Uses string manipulation and conditional logic to check these patterns

## Features

- Load users from a JSON file
- Store users in a map (key=ID, value=user object)
- Retrieve user information using REST API endpoints
- Create new users with validation
- Prevent duplicate users (by ID or name)
- Comprehensive validation for Israeli IDs and phone numbers
- Detailed error reporting for invalid data

## Project Structure

```
├── src/
│   ├── index.js                 # Main entry point
│   ├── server.js                # Express server setup
│   ├── controllers/             # Request handlers
│   │   └── userController.js
│   ├── models/                  # Data models
│   │   └── User.js
│   ├── validators/              # Input validation
│   │   └── userValidator.js
│   └── data/
│       └── users.json           # Sample data
├── tests/                       # Test files
│   └── api.test.js
├── package.json
└── README.md                    # Documentation
```

## Key Components

### User Model (`models/User.js`)
- Represents a user entity with ID, name, phone, and address
- Provides methods for validation and conversion to/from JSON
- Uses validator functions to check ID and phone number validity

### User Validator (`validators/userValidator.js`)
- Contains functions to validate Israeli IDs and phone numbers
- Implements the Luhn algorithm for Israeli ID validation
- Validates multiple formats of Israeli phone numbers

### User Controller (`controllers/userController.js`)
- Manages user data and handles API requests
- Implements user loading from JSON files
- Provides endpoints for listing users, retrieving specific users, and creating new users
- Includes validation and error handling for all operations
- Prevents duplicate users (by ID or name)

### Server (`server.js`)
- Sets up Express middleware and routes
- Configures API endpoints and maps them to controller functions
- Initializes the user data loading on startup

## Technical Implementation Details

1. **In-Memory Storage**: Users are stored in a Map for O(1) lookup by ID.

2. **Error Handling**: Each validation step returns appropriate HTTP status codes and error messages:
   - 200: Successful operation
   - 201: Resource successfully created 
   - 400: Bad request (validation failures)
   - 404: Resource not found
   - 409: Conflict (duplicate resources)

3. **Input Validation**: Comprehensive validation ensures data integrity:
   - Israeli ID validation using the check-digit algorithm
   - Phone number format validation for multiple Israeli formats
   - Type checking for all user fields

4. **Duplicate Prevention**: The system prevents the creation of duplicate users:
   - Checks for existing users with the same ID
   - Checks for existing users with the same name

## Testing Architecture

The project includes comprehensive API tests using Jest and Supertest:

1. Tests verify that the API correctly loads test users
2. Tests the GET endpoints for listing all users and retrieving specific users
3. Tests the POST endpoint for creating new users
4. Tests validation by attempting to create users with invalid data

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

### GET /users
Returns a list of all usernames.

Example response:
```json
["Israel Israeli", "Michal Cohen", "David Levy"]
```

### GET /users/:name
Returns detailed information about a specific user.

Example request:
```
GET /users/Israel%20Israeli
```

Example response:
```json
{
  "id": "123456782",
  "name": "Israel Israeli",
  "phone": "0501234567",
  "address": "1 Herzl Street, Tel Aviv"
}
```

### POST /users
Creates a new user.

Example request:
```json
{
  "id": "304687148",
  "name": "Jacob Cohen",
  "phone": "0541234567",
  "address": "100 Jaffa Street, Jerusalem"
}
```

Example response (201 Created):
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

## Potential Enhancements

Future improvements could include:

1. Adding update and delete operations to complete CRUD functionality
2. Implementing persistent storage (database) instead of in-memory Map
3. Adding authentication and authorization
4. Implementing pagination for large datasets
5. Adding more comprehensive error handling and logging
6. Adding more validation rules for other fields (e.g., address format)
7. Implementing rate limiting to prevent abuse
8. Adding support for other ID/phone formats for international users