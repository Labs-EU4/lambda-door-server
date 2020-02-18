const Users = require('../users/userModel');
const Reviews = require('../reviews/companyReviews/companyReviewsModel');
const Interests = require('../users/interests/interestsModel');
const salaryReviews = require('../reviews/salaryReviews/salaryReviewsModel');
const interviewReviews = require('../reviews/interviewReviews/interviewReviewModel');
const Companies = require('../companies/companyModel');

const userExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const salaryReviewExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await salaryReviews.findSalaryReviewById(id);
    if (!review) {
      return res.status(400).json({ error: 'Review does not exist' });
    }
    req.review = review;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const reviewExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await Reviews.findReviewById(id);
    if (!review) {
      return res.status(400).json({ error: 'Review does not exist' });
    }
    req.review = review;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const interestExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const interest = await Interests.findById(id);
    if (!interest) {
      return res.status(400).json({ error: 'interest does not exist' });
    }
    req.interest = interest;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const userInterestExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const interest = await Interests.findUserInterestById(id);
    if (!interest) {
      return res.status(400).json({ error: 'user interest does not exist' });
    }
    req.interest = interest;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const interviewReviewExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await interviewReviews.findInterviewReviewById(id);
    if (!review) {
      return res.status(400).json({ error: 'Review does not exist' });
    }
    req.review = review;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const companyExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const company = await Companies.findCompanyById(id);
    if (!company) {
      return res.status(400).json({ error: 'Company does not exist' });
    }
    req.company = company;
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  userExists,
  interestExists,
  userInterestExists,
  reviewExists,
  salaryReviewExists,
  interviewReviewExists,
  companyExists,
};
