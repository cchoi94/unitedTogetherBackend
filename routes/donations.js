const express = require('express');
const router = express.Router();
const { createDonation } = require('../controllers/donations');

router.route('/').post(createDonation);

module.exports = router;
