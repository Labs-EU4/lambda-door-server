const express = require('express');
const reviews = require('./salaryReviewsController');
const validate = require('../../middleware/validation');

const router = express.Router();
router.get('/', reviews.getSalaryReviews);
router.get('/avg/:id', reviews.getAvgSalaryReviewsByCompany);
router.post('/', reviews.addUseSalaryrReview);
router.delete(
  '/:id',
  validate.salaryReviewExists,
  reviews.deleteUserSalaryReview
);
router.patch(
  '/:id',
  validate.salaryReviewExists,
  reviews.updateUserSalaryrReview
);
router.get('/user/:id', validate.userExists, reviews.getUserSalaryReviews);
router.get(
  '/:id',
  validate.salaryReviewExists,
  reviews.findUserSalaryReviewById
);
router.get('/reviews/:id', reviews.getSalaryReviewsByCompany);
router.get('/highest-paid-jobs', reviews.getHighestPaidJobs)

module.exports = router;
