const Astrologer = require('../models/astrologerModel');
const User = require('../models/userModel');

// Weighted Round Robin connection service
const connectUserToAstrologer = async (userId) => {
  // Fetch all available astrologers
  const astrologers = await Astrologer.find({ available: true });

  if (astrologers.length === 0) {
    throw new Error('No astrologers available');
  }

  // Select an astrologer based on their weight (Weighted Round Robin)
  let totalWeight = astrologers.reduce((sum, astro) => sum + astro.weight, 0);
  
  let random = Math.random() * totalWeight;
  let selectedAstrologer = null;

  for (let astrologer of astrologers) {
    random -= astrologer.weight;
    if (random <= 0) {
      selectedAstrologer = astrologer;
      break;
    }
  }

  // Assign the user to the selected astrologer without creating a new user
  await User.findByIdAndUpdate(userId, { connectedAstrologer: selectedAstrologer._id });

  return selectedAstrologer;
};


// Update weights based on admin-defined thresholds
const updateAstrologerWeights = async (rating, sessions, percentage) => {
  const topAstrologers = await Astrologer.find({
    rating: { $gte: rating },
    sessions: { $gte: sessions },
  });

  // Check if no top astrologers were found
  if (topAstrologers.length === 0) {
    throw new Error('No top astrologers found with the specified criteria');
  }

  // Adjust weight for top astrologers
  for (let astrologer of topAstrologers) {
    astrologer.weight = astrologer.weight * (1 + percentage / 100);
    await astrologer.save();
  }

  return topAstrologers;
};


module.exports = {
  connectUserToAstrologer,
  updateAstrologerWeights,
};
