const express = require('express');
const { setTopAstrologerThreshold } = require('../controllers/flowController');
const { adjustTopAstrologerFlowPercentage } = require('../controllers/flowController');
const { verifyAdmin } = require('../utils/apiAuth');
const router = express.Router();

router.put('/top-astrologers/threshold', verifyAdmin, setTopAstrologerThreshold);
router.put('/top-astrologers/percentage', verifyAdmin, adjustTopAstrologerFlowPercentage);

module.exports = router;
