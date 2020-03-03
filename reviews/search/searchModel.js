const db = require('../../database/db-config');

function companySearch(searchTerms) {
  return db
    .select('*')
    .from('companies as c')
    .whereRaw(
      'LOWER(c.name) LIKE ?',
      `%${searchTerms.search_query.toLowerCase()}%`
    )
    .orWhereRaw(
      'LOWER(c.location) LIKE ?',
      `%${searchTerms.search_query.toLowerCase()}%`
    );
}

function salarySearch(searchTerms) {
  return db
    .select('*')
    .from('salary_reviews as sr')
    .leftJoin('companies as c', 'sr.company_id', 'c.id')
    .whereRaw(
      'LOWER(sr.job_title) LIKE ?',
      `%${searchTerms.search_query.toLowerCase()}%`
    )
    .orWhereRaw(
      'LOWER(c.location) LIKE ?',
      `%${searchTerms.search_query.toLowerCase()}%`
    );
}

function interviewSearch(searchTerms) {
  return db
    .select('*', 'c.location')
    .from('interview_process_reviews as ipr')
    .leftJoin('companies as c', 'ipr.company_id', 'c.id')
    .whereRaw(
      'LOWER(ipr.job_title) LIKE ?',
      `%${searchTerms.search_query.toLowerCase()}%`
    )
    .orWhereRaw(
      'LOWER(c.location) LIKE ?',
      `%${searchTerms.search_query.toLowerCase()}%`
    )
    .orWhereRaw(
      'LOWER(c.name) LIKE ?',
      `%${searchTerms.search_query.toLowerCase()}%`
    );
}

module.exports = {
  companySearch,
  salarySearch,
  interviewSearch,
};
