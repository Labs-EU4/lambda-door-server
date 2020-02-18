const db = require('../../database/db-config');

function findReviewByCompanyId(id) {
  return db
    .select(
      'cr.id',
      'cr.ratings',
      'cr.review_headline',
      'cr.review',
      'c.name',
      'c.id as company_id',
      'cr.is_accepting_questions',
      'users.full_name',
      'users.id as user_id',
      'users.email_address'
    )
    .from('companies as c')
    .join('company_reviews as cr', 'cr.company_id', 'c.id')
    .leftJoin('users', 'users.id', 'cr.user_id')
    .where('c.id', '=', id);
}

function getReviews(id) {
  return db
    .select(
      'cr.id',
      'cr.ratings',
      'cr.is_currently_employed',
      'cr.review_headline',
      'cr.review',
      'cr.is_accepting_questions',
      'c.name',
      'cr.user_id',
      'cr.company_id'
    )
    .from('company_reviews as cr')
    .join('companies as c', 'cr.company_id', 'c.id')
    .where('cr.user_id', '=', id);
}

function findReviewById(id) {
  return db
    .select(
      'cr.id',
      'cr.ratings',
      'cr.is_currently_employed',
      'cr.review_headline',
      'cr.review',
      'cr.is_accepting_questions',
      'c.name',
      'cr.user_id',
      'users.full_name',
      'users.email_address',
      'c.id as company_id',
      'cr.company_id'
    )
    .from('company_reviews as cr')
    .join('companies as c', 'cr.company_id', 'c.id')
    .leftJoin('users', 'users.id', 'cr.user_id')
    .where('cr.id', '=', id)
    .first();
}

function deleteReview(id) {
  return db('company_reviews')
    .where({ id })
    .del();
}

function updateReview(id, changes) {
  return db('company_reviews')
    .where({ id })
    .update(changes);
}

function insert(review) {
  return db('company_reviews')
    .insert(review, 'id')
    .then(ids => {
      return findReviewById(ids[0]);
    });
}

module.exports = {
  getReviews,
  findReviewById,
  deleteReview,
  updateReview,
  insert,
  findReviewByCompanyId,
};
