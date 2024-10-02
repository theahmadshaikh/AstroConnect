const app = require('./app');  // Import the app from app.js

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export server for testing purposes
module.exports = server;
