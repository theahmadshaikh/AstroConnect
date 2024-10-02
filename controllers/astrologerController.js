const Astrologer = require('../models/astrologerModel');

// Create a new astrologer (admin only)
const createAstrologer = async (req, res) => {
  try {
    const { name, expertise } = req.body;
    const astrologer = new Astrologer({ name, expertise });
    await astrologer.save();
    res.status(201).json(astrologer);
  } catch (error) {
    res.status(400).json({ message: 'Invalid astrologer data' });
  }
};

// Get all astrologers
const getAstrologers = async (req, res) => {
  try {
    const astrologers = await Astrologer.find({});
    res.status(200).json(astrologers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch astrologers' });
  }
};


// Update an astrologer's rating and session count
const updateAstrologer = async (req, res) => {
  try {
    const astrologerId = req.params.id;
    const { rating, sessions } = req.body;
    // Find the astrologer and update their rating and session count
    const updatedAstrologer = await Astrologer.findByIdAndUpdate(
      astrologerId,
      { rating, sessions },
      { new: true }
    );
    if (!updatedAstrologer) {
      return res.status(404).json({ message: 'Astrologer not found' });
    }

    res.status(200).json({ message: 'Astrologer updated', updatedAstrologer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating astrologer', error: error.message });
  }
};

module.exports = {
  createAstrologer,
  getAstrologers,
  updateAstrologer,
};
