const Sentry = require('@sentry/node');
const Reviews = require('./companyReviewsModel');

const getCompanyReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const companyReviews = await Reviews.findReviewByCompanyId(id);
    return res.status(200).json(companyReviews);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const userReviews = await Reviews.getReviews(id);
    return res.status(200).json(userReviews);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Reviews.deleteReview(id);
    return res.sendStatus(204);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const findUserReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findReviewById(id);
    return res.status(200).json(review);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateUserReview = async (req, res) => {
  const { id } = req.params;
  try {
    await Reviews.updateReview(id, {
      company_id: req.body.company_id,
      is_accepting_questions: req.body.is_accepting_questions,
      is_currently_employed: req.body.is_currently_employed,
      ratings: req.body.ratings,
      review: req.body.review,
      review_headline: req.body.review_headline,
      user_id: req.body.user_id,
    });
    const updatedReview = await Reviews.findReviewById(id);
    return res.status(200).json(updatedReview);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};
const addUserReview = async (req, res) => {
  try {
    const review = await Reviews.insert({
      company_id: req.body.company_id,
      is_accepting_questions: req.body.is_accepting_questions,
      is_currently_employed: req.body.is_currently_employed,
      ratings: req.body.ratings,
      review: req.body.review,
      review_headline: req.body.review_headline,
      user_id: req.body.user_id,
    });
    return res.status(201).json(review);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserReviews,
  deleteUserReview,
  updateUserReview,
  findUserReviewById,
  addUserReview,
  getCompanyReviews,
};
