const express = require('express');
const search = require('./searchController');

const router = express.Router();

router.get('/companies', search.getCompanyResults);
router.get('/interviews', search.getInterviewResults);
router.get('/salaries', search.getSalaryResults);

module.exports = router;
