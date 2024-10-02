const { updateAstrologerWeights } = require('../services/connectionService');
const Astrologer = require("../models/astrologerModel")

// Update thresholds for top astrologers (admin only)
const setTopAstrologerThreshold = async (req, res) => {
  const { rating, sessions, percentage } = req.body;

  try {
    // Call the function to update astrologer weights
    const topAstrologers = await updateAstrologerWeights(rating, sessions, percentage);

    // If the function throws an error, it will be caught in the catch block below
    res.status(200).json({ message: 'Threshold updated', topAstrologers });
  } catch (error) {
    console.error('Error updating threshold:', error); // Log the error for debugging

    // Check if the error is related to no top astrologers found
    if (error.message.includes('No top astrologers found')) {
      return res.status(404).json({ message: error.message });
    }

    // Handle any other errors
    res.status(500).json({ message: 'Error updating astrologer weights', error: error.message });
  }
};



const adjustTopAstrologerFlowPercentage = async (req, res) => {
console.log("hi")
  try {
      const { percentage,rating,sessions } = req.body;

      // Validate the incoming percentage
      if (typeof percentage !== 'number' || percentage <= 0) {
          return res.status(400).json({ message: 'Invalid percentage value' });
      }

      // Fetch top astrologers based on your criteria (e.g., rating, sessions)
      const topAstrologers = await Astrologer.find({rating:{$gte:rating},sessions:{$gte:sessions}});

      if (topAstrologers.length === 0) {
          return res.status(404).json({ message: 'No top astrologers found' });
      }

      // Update the weights of the top astrologers based on the percentage
      for (let astrologer of topAstrologers) {
          astrologer.weight += (astrologer.weight * (percentage / 100)); // Adjust weight
          await astrologer.save();
      }

      res.status(200).json({ message: 'Percentage updated' });
  } catch (error) {
      console.error('Error updating flow percentage:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  setTopAstrologerThreshold,
  adjustTopAstrologerFlowPercentage
};
