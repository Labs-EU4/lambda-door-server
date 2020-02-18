const db = require('../../database/db-config');

function interviewReviewByCompanyId(id) {
  return db
    .select(
      'i.id',
      'i.text',
      'i.user_id',
      'i.company_id',
      'i.job_title',
      'i.is_accepting_questions',
      'i.is_current_employee',
      'c.id as company_id',
      'c.name',
      'u.full_name',
      'u.email_address'
    )
    .from('interview_process_reviews as i')
    .join('companies as c', 'c.id', 'i.company_id')
    .join('users as u', 'u.id', 'i.user_id')
    .where('c.id', '=', id);
}

function getUsersInterviewReviews(id) {
  return db
    .select(
      'i.id',
      'i.text',
      'i.user_id',
      'i.is_accepting_questions',
      'i.is_current_employee',
      'i.job_title',
      'c.id as company_id',
      'c.name'
    )
    .from('interview_process_reviews as i')
    .join('companies as c', 'c.id', 'i.company_id')
    .where('i.user_id', '=', id);
}

function findInterviewReviewById(id) {
  return db
    .select(
      'i.id',
      'i.text',
      'i.user_id',
      'i.company_id',
      'i.is_accepting_questions',
      'i.is_current_employee',
      'i.job_title',
      'c.id as company_id',
      'c.name',
      'u.full_name',
      'u.email_address'
    )
    .from('interview_process_reviews as i')
    .join('companies as c', 'c.id', 'i.company_id')
    .join('users as u', 'u.id', 'i.user_id')
    .where('i.id', '=', id)
    .first();
}

function deleteInterviewReview(id) {
  return db('interview_process_reviews')
    .where({ id })
    .del();
}

function updateInterviewReview(id, changes) {
  return db('interview_process_reviews')
    .where({ id })
    .update(changes);
}

function insertInterviewReview(review) {
  return db('interview_process_reviews')
    .insert(review, 'id')
    .then(ids => {
      return findInterviewReviewById(ids[0]);
    });
}

module.exports = {
  getUsersInterviewReviews,
  findInterviewReviewById,
  deleteInterviewReview,
  updateInterviewReview,
  insertInterviewReview,
  interviewReviewByCompanyId,
};
