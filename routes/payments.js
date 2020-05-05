const express = require('express');
const router = express.Router();
const { createSecret } = require('../controllers/payments');

router.route('/secret').post(createSecret);

module.exports = router;
