const express = require('express');
const db = require('./dataDisplayController');

const router = express.Router();
router.get('/', db.GetJobRoles);

module.exports = router;
