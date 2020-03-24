const db = require('../../database/db-config');

function getReviews() {
  return db
    .select(
      'sr.id',
      'sr.user_id',
      'sr.company_id',
      'sr.text',
      'c.name as company_name',
      'sr.description',
      'sr.salary',
      'sr.base_salary',
      'sr.currency',
      'sr.is_accepting_questions',
      'sr.is_anonymous',
      'sr.job_title',
      'users.full_name'
    )
    .from('salary_reviews as sr')
    .leftJoin('companies as c', 'sr.company_id', 'c.id')
    .leftJoin('users', 'users.id', 'sr.user_id');
}

function getAvgReviewsByCompany(id) {
  return db
    .select('sr.currency')
    .from('salary_reviews as sr')
    .avg('salary')
    .groupBy('sr.currency')
    .where('company_id', '=', id);
}

function salaryReviewByCompanyId(id) {
  return db
    .select(
      'sr.id',
      'sr.description',
      'sr.salary',
      'sr.user_id',
      'sr.base_salary',
      'sr.job_title',
      'sr.currency',
      'c.name',
      'sr.is_accepting_questions',
      'sr.is_anonymous',
      'users.email_address',
      'users.full_name'
    )
    .from('companies as c')
    .join('salary_reviews as sr', 'sr.company_id', 'c.id')
    .leftJoin('users', 'users.id', 'sr.user_id')
    .where('c.id', '=', id);
}

function getUsersSalaryReviews(id) {
  return db
    .select(
      'sr.id',
      'sr.company_id',
      'sr.description',
      'sr.salary',
      'sr.user_id',
      'sr.base_salary',
      'sr.job_title',
      'sr.currency',
      'sr.is_accepting_questions',
      'sr.is_current_employee',
      'sr.is_anonymous',
      'c.name'
    )
    .from('salary_reviews as sr')
    .join('companies as c', 'c.id', 'sr.company_id')
    .where('sr.user_id', '=', id);
}

function findSalaryReviewById(id) {
  return db
    .select(
      'sr.id',
      'sr.company_id',
      'sr.user_id',
      'sr.description',
      'sr.salary',
      'sr.base_salary',
      'sr.job_title',
      'sr.currency',
      'sr.is_accepting_questions',
      'sr.is_current_employee',
      'sr.is_anonymous',
      'c.name as company_name',
      'users.full_name'
    )
    .from('salary_reviews as sr')
    .join('companies as c', 'sr.company_id', 'c.id')
    .leftJoin('users', 'users.id', 'sr.user_id')
    .where('sr.id', '=', id)
    .first();
}

function deleteSalaryReview(id) {
  return db('salary_reviews')
    .where({ id })
    .del();
}

function updateSalaryReview(id, changes) {
  return db('salary_reviews')
    .where({ id })
    .update(changes);
}

function insertSalaryReview(review) {
  return db('salary_reviews')
    .insert(review, 'id')
    .then(ids => {
      return findSalaryReviewById(ids[0]);
    });
}

function getJobsWithHighestSalary() {
  return db('salary_reviews as sr')
    .leftJoin('companies as c', 'c.id', 'sr.company_id')
    .orderBy('sr.base_salary', 'desc')
    .select(
      'sr.job_title',
      'sr.base_salary',
      'sr.salary',
      'sr.currency',
      'c.name as companyName'
    );
}

module.exports = {
  getReviews,
  getAvgReviewsByCompany,
  getUsersSalaryReviews,
  findSalaryReviewById,
  deleteSalaryReview,
  updateSalaryReview,
  insertSalaryReview,
  salaryReviewByCompanyId,
  getJobsWithHighestSalary,
};
