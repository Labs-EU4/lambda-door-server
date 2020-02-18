const express = require('express');
const referral = require('./referralController');

const router = express.Router();

router.post('/', referral.sendMail);

module.exports = router;
