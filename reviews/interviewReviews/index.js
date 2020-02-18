const express = require('express');
const reviews = require('./interviewReviewController');
const validate = require('../../middleware/validation');

const router = express.Router();
router.post('/', reviews.addInterviewReview);
router.delete(
  '/:id',
  validate.interviewReviewExists,
  reviews.deleteUserInterviewReview
);
router.patch(
  '/:id',
  validate.interviewReviewExists,
  reviews.updateUserInterviewReview
);
router.get('/user/:id', validate.userExists, reviews.getUserInterviewReviews);
router.get(
  '/:id',
  validate.interviewReviewExists,
  reviews.findUserInterviewReviewById
);
router.get('/reviews/:id', reviews.getInterviewReviewsByCompany);

module.exports = router;
