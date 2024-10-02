const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: [{ type: String }],
  rating: { type: Number, default: 0 },
  sessions: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  weight: { type: Number, default: 1 }, // Dynamic weight for Weighted Round Robin
});

const Astrologer = mongoose.model('Astrologer', astrologerSchema);
module.exports = Astrologer;
