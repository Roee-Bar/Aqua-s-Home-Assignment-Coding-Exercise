const request = require('supertest');
const app = require('../src/server');
const userController = require('../src/controllers/userController');
const path = require('path');
const fs = require('fs');

// Before all tests, load users from the test file
beforeAll(() => {
  // Load test users
  const testDataPath = path.join(__dirname, '..', 'src', 'data', 'users.json');
  userController.loadUsers(testDataPath);
});

describe('API Tests', () => {
  // Test getting all usernames
  test('GET /users should return all usernames', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test getting a user by name
  test('GET /users/:name should return a user', async () => {
    // Get a username from the list
    const usersResponse = await request(app).get('/users');
    const firstUsername = usersResponse.body[0];
    
    const response = await request(app).get(`/users/${firstUsername}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstUsername);
  });

  // Test creating a new user
  test('POST /users should create a new user', async () => {
    const newUser = {
      id: "304687148",
      name: "Jacob Cohen",
      phone: "0541234567",
      address: "100 Jaffa Street, Jerusalem"
    };
    
    const response = await request(app)
      .post('/users')
      .send(newUser)
      .set('Content-Type', 'application/json');
    
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBe(newUser.id);
    expect(response.body.name).toBe(newUser.name);
  });

  // Test creating a user with invalid ID
  test('POST /users should reject user with invalid ID', async () => {
    const invalidUser = {
      id: "123456789",
      name: "Invalid User",
      phone: "0541234567",
      address: "Invalid Address"
    };
    
    const response = await request(app)
      .post('/users')
      .send(invalidUser)
      .set('Content-Type', 'application/json');
    
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Invalid Israeli ID');
  });
});

