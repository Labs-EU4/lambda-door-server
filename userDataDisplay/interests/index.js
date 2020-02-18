const express = require('express');
const interest = require('./interestsController');
const validate = require('../../middleware/validation');

const router = express.Router();

router.get('/', interest.getInterests);
router.get('/:id', validate.interestExists, interest.getInterest);
router.get('/user/:id', validate.userExists, interest.getUserInterests);
router.post('/', interest.addUserInterest);
router.get('/ui/:id', validate.userInterestExists, interest.getUserInterest);
router.delete(
  '/ui/:id',
  validate.userInterestExists,
  interest.deleteUserInterest
);
module.exports = router;
