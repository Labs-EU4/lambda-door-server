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

const updateUserSalaryReview = async (req, res) => {
  const { id } = req.params;
  try {
    await Reviews.updateSalaryReview(id, {
      company_id: req.body.company_id,
      currency: req.body.currency,
      description: req.body.description,
      is_accepting_questions: req.body.is_accepting_questions,
      is_anonymous: req.body.is_anonymous,
      is_current_employee: req.body.is_current_employee,
      job_title: req.body.job_title,
      salary: req.body.salary,
      user_id: req.body.user_id,
      employment_type: req.body.employment_type,
    });
    const updatedReview = await Reviews.findSalaryReviewById(id);
    return res.status(200).json(updatedReview);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};
const addUseSalaryReview = async (req, res) => {
  try {
    const review = await Reviews.insertSalaryReview({
      company_id: req.body.company_id,
      currency: req.body.currency,
      description: req.body.description,
      is_accepting_questions: req.body.is_accepting_questions,
      is_anonymous: req.body.is_anonymous,
      is_current_employee: req.body.is_current_employee,
      job_title: req.body.job_title,
      salary: req.body.salary,
      user_id: req.body.user_id,
      employment_type: req.body.employment_type,
      base_salary: req.body.base_salary,
    });
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
  updateUserSalaryReview,
  findUserSalaryReviewById,
  addUseSalaryReview,
  getSalaryReviewsByCompany,
  getHighestPaidJobs
};
