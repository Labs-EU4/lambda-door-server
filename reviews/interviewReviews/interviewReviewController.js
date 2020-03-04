/* eslint-disable camelcase */
const Sentry = require('@sentry/node');
const Reviews = require('./interviewReviewModel');

const getInterviewReviewsByCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const salaryReviews = await Reviews.interviewReviewByCompanyId(id);
    return res.status(200).json(salaryReviews);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const getUserInterviewReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const userReviews = await Reviews.getUsersInterviewReviews(id);
    return res.status(200).json(userReviews);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserInterviewReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Reviews.deleteInterviewReview(id);
    return res.sendStatus(204);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const findUserInterviewReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findInterviewReviewById(id);
    return res.status(200).json(review);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateUserInterviewReview = async (req, res) => {
  const { id } = req.params;
  try {
    await Reviews.updateInterviewReview(id, {
      user_id: req.body.user_id,
      company_id: req.body.company_id,
      text: req.body.text,
      is_accepting_questions: req.body.is_accepting_questions,
      is_current_employee: req.body.is_current_employee,
      created_at: req.body.created_at,
      job_title: req.body.job_title,
    });
    const updatedReview = await Reviews.findInterviewReviewById(id);
    return res.status(200).json(updatedReview);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};
const addInterviewReview = async (req, res) => {
  try {
    const review = await Reviews.insertInterviewReview({
      user_id: req.body.user_id,
      company_id: req.body.company_id,
      text: req.body.text,
      is_accepting_questions: req.body.is_accepting_questions,
      is_current_employee: req.body.is_current_employee,
      created_at: req.body.created_at,
      job_title: req.body.job_title,
    });
    return res.status(201).json(review);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getInterviewReviewsByCompany,
  getUserInterviewReviews,
  deleteUserInterviewReview,
  findUserInterviewReviewById,
  updateUserInterviewReview,
  addInterviewReview,
};
