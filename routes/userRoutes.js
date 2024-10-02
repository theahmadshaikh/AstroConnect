const express = require('express');
const { createUser, allocateUserToAstrologer } = require('../controllers/userController');
const {verifyAdmin} = require("../utils/apiAuth")
const router = express.Router();


// Route for creating a new user
router.post('/', createUser);

//connect users
router.post('/connect', verifyAdmin, allocateUserToAstrologer);

module.exports = router;
