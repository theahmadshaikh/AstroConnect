const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const astrologerRoutes = require('./routes/astrologerRoutes');
const flowRoutes = require('./routes/flowRoutes');
const userRoutes = require("./routes/userRoutes")

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize app
const app = express();
app.use(express.json());

// Define Routes
app.use('/api/astrologers', astrologerRoutes);
app.use('/api/flow', flowRoutes);
app.use('/api/users', userRoutes)

// Error handling for invalid routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Export the app (without starting the server)
module.exports = app;
