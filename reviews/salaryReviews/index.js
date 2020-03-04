const express = require('express');
const reviews = require('./salaryReviewsController');
const validate = require('../../middleware/validation');

const router = express.Router();
router.get('/', reviews.getSalaryReviews);
router.get('/highest', reviews.getHighestPaidJobs);
router.get('/avg/:id', reviews.getAvgSalaryReviewsByCompany);
router.post('/', reviews.addUseSalaryReview);
router.delete(
  '/:id',
  validate.salaryReviewExists,
  reviews.deleteUserSalaryReview
);
router.patch(
  '/:id',
  validate.salaryReviewExists,
  reviews.updateUserSalaryReview
);


router.get('/user/:id', validate.userExists, reviews.getUserSalaryReviews);
router.get(
  '/:id',
  validate.salaryReviewExists,
  reviews.findUserSalaryReviewById
);
router.get('/reviews/:id', reviews.getSalaryReviewsByCompany);

module.exports = router;
