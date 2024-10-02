// controllers/userController.js
const User = require('../models/userModel');
const { connectUserToAstrologer } = require('../services/connectionService');

const createUser = async (req, res) => {
    const { username, email, preferences } = req.body; // Include preferences

    try {
        const newUser = new User({ 
            username, 
            email, 
            preferences: preferences || {} // Use provided preferences or default to an empty object
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

const allocateUserToAstrologer = async (req, res) => {
    const { userId } = req.body;
  
    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'Invalid request' });
    }
  
    try {
      // Call the connection service to allocate the user
      const assignedAstrologer = await connectUserToAstrologer(userId);
      return res.status(200).json({ assignedAstrologerId: assignedAstrologer._id });
    } catch (error) {
      if (error.message === 'No astrologers available') {
        return res.status(404).json({ message: 'No astrologers available' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    createUser,
    allocateUserToAstrologer
};
