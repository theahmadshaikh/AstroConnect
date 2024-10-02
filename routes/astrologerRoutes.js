const express = require('express');
const { createAstrologer, getAstrologers,updateAstrologer } = require('../controllers/astrologerController');
const { verifyAdmin } = require('../utils/apiAuth');
const router = express.Router();

router.post('/', verifyAdmin, createAstrologer);
router.get('/', getAstrologers);
//api/astrologers/:id (to update rating and sessions for an astrologer)
router.put('/:id', verifyAdmin, updateAstrologer);
module.exports = router;
