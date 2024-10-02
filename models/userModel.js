// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Ensuring unique usernames
    email: { type: String, required: true, unique: true }, // Ensuring unique email addresses
    preferences: { type: Object, default: {} }, // Optional: To store user preferences
    connectedAstrologer: { type: mongoose.Schema.Types.ObjectId, ref: 'Astrologer' }, // Reference to an astrologer
});

const User = mongoose.model('User', userSchema);
module.exports = User;
