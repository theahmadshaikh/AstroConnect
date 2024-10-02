const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');  // Import your app, not the server
const dotenv = require("dotenv");

dotenv.config();
let server;
let astrologerId;  // This will store the created astrologer's ID for other tests
let userId;  // This will store the created user's ID for allocation tests

// Load API key from environment variables
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

beforeAll((done) => {
  // Start the server before tests
  server = app.listen(3000, done);
});

afterAll(async () => {
  // Close the server and MongoDB connection after tests
  await server.close();
  await mongoose.connection.close();  // Use async/await to close connection properly
});

describe('API Endpoints with API Key', () => {
  it('should create a new astrologer', async () => {
    const res = await request(server)
      .post('/api/astrologers')
      .set('x-api-key', ADMIN_API_KEY)  // Include the API key here
      .send({
        name: "John Doe",
        expertise: ["Horoscope", "Palmistry"]
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    astrologerId = res.body._id;  // Save the astrologer's ID for other tests
  }, 10000);

  it('should create a new user', async () => {
    const randomUsername = `user_${Math.floor(Math.random() * 10000)}`;  // Generate a unique username
    const randomEmail = `user_${Math.floor(Math.random() * 10000)}@example.com`;  // Generate a unique email
  
    const res = await request(server)
      .post('/api/users')  // Assuming /api/users is the endpoint for creating users
      .send({
        username: randomUsername,  // Use generated unique username
        email: randomEmail,  // Use generated unique email
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    userId = res.body._id;  // Save the user's ID for allocation tests
  }, 10000);  

  it('should get all astrologers', async () => {
    const res = await request(server)
      .get('/api/astrologers')
      .set('x-api-key', ADMIN_API_KEY); 
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test allocating a user to an astrologer
  it('should allocate a user to an astrologer', async () => {
    const res = await request(server)
      .post('/api/users/connect')
      .set('x-api-key', ADMIN_API_KEY)  
      .send({
        userId: userId,  // Use the created user's ID
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('assignedAstrologerId');  // Check if an astrologer ID is assigned
  });

  // Test adjusting top astrologer threshold
  it('should return 404 when no top astrologers are found', async () => {
    const res = await request(server)
      .put('/api/flow/top-astrologers/threshold')
      .set('x-api-key', ADMIN_API_KEY)  // Include the API key here
      .send({
        rating: 4.5,  // Threshold for top astrologers
        sessions: 50,
        percentage: 20
      });
  
    expect(res.statusCode).toEqual(404);  // Expect a 404 status code when no astrologers are found
    expect(res.body.message).toBe('No top astrologers found with the specified criteria');  // Expect specific error message
  });

  // Test adjusting the flow percentage for top astrologers
  it('should adjust the flow percentage for top astrologers', async () => {
    const res = await request(server)
      .put('/api/flow/top-astrologers/percentage')
      .set('x-api-key', ADMIN_API_KEY)  // Include the API key here
      .send({
        percentage: 20, 
        rating:4.5,
        sessions:10 // Increase top astrologer flow by 20%
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Percentage updated');
  });

  // Test if top astrologers are prioritized in allocation
  it('should prioritize top astrologers in user allocation', async () => {
    // First, mark an astrologer as top (set high rating and session count)
    await request(server)
      .put(`/api/astrologers/${astrologerId}`)
      .set('x-api-key', ADMIN_API_KEY)  // Include the API key here
      .send({
        rating: 5.0,  // High rating to make them top
        sessions: 100
      });

    const res = await request(server)
      .post('/api/users/connect')
      .set('x-api-key', ADMIN_API_KEY)
      .send({
        userId: userId  // Use the created user's ID
      });

    expect(res.statusCode).toEqual(200);
  
});

  // Test error handling for invalid user requests
  it('should return 400 for invalid user data', async () => {
    const res = await request(server)
      .post('/api/users/connect')
      .set('x-api-key', ADMIN_API_KEY)
      .send({});  // Missing userId

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Invalid request');
  });
});
