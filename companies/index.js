const express = require('express');
const company = require('./companyController');
const validate = require('../middleware/validation');

const router = express.Router();

router.get('/', company.getCompanies);
router.get('/top', company.getTopRated);
router.get('/:id', company.getCompany);
router.get('/:id/closest', company.getClosestCompanies);
router.post('/', company.addCompany);
router.patch(`/:id`, validate.companyExists, company.updateCompany);

module.exports = router;
