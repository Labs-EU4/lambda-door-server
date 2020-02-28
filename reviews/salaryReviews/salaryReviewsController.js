const Sentry = require('@sentry/node');
const Reviews = require('./salaryReviewsModel');

const getSalaryReviews = async (req, res) => {
  try {
    const salaryReviews = await Reviews.getReviews();
    return res.status(200).json(salaryReviews);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const getSalaryReviewsByCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const salaryReviews = await Reviews.salaryReviewByCompanyId(id);
    return res.status(200).json(salaryReviews);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const getAvgSalaryReviewsByCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const salaryReviews = await Reviews.getAvgReviewsByCompany(id);
    return res.status(200).json(salaryReviews);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const getUserSalaryReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const userReviews = await Reviews.getUsersSalaryReviews(id);
    return res.status(200).json(userReviews);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserSalaryReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Reviews.deleteSalaryReview(id);
    return res.sendStatus(204);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const findUserSalaryReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findSalaryReviewById(id);
    return res.status(200).json(review);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateUserSalaryrReview = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    await Reviews.updateSalaryReview(id, changes);
    const updatedReview = await Reviews.findSalaryReviewById(id);
    return res.status(200).json(updatedReview);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};
const addUseSalaryrReview = async (req, res) => {
  try {
    const newUserReview = req.body;
    const review = await Reviews.insertSalaryReview(newUserReview);
    return res.status(201).json(review);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const getHighestPaidJobs = async (req, res) => {
  try {
    const jobsWithHighestSalary = await Reviews.getJobsWithHighestSalary();
    return res.status(200).json(jobsWithHighestSalary)
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ 
      error: error.message,
      stack: error.stack
     });
  }
}

module.exports = {
  getSalaryReviews,
  getAvgSalaryReviewsByCompany,
  getUserSalaryReviews,
  deleteUserSalaryReview,
  updateUserSalaryrReview,
  findUserSalaryReviewById,
  addUseSalaryrReview,
  getSalaryReviewsByCompany,
  getHighestPaidJobs
};
