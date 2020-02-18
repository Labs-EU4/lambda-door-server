const express = require('express');
const reviews = require('./companyReviewsController');
const validate = require('../../middleware/validation');

const router = express.Router();
router.post('/:id', validate.userExists, reviews.addUserReview);
router.get('/user/:id', validate.userExists, reviews.getUserReviews);
router.delete('/:id', validate.reviewExists, reviews.deleteUserReview);
router.patch('/:id', validate.reviewExists, reviews.updateUserReview);
router.get('/:id', reviews.findUserReviewById);
router.get('/reviews/:id', reviews.getCompanyReviews);

module.exports = router;
