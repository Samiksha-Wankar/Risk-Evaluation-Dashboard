const express = require('express');
const { getRisks, createRisk } = require('../controllers/riskController');

const router = express.Router();

router.get('/', getRisks);
router.post('/', createRisk);

module.exports = router;
