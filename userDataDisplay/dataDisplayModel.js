const db = require('../database/db-config');

const JobRole = () => {
  return db
    .from('salary_reviews as sr')
    .where('is_current_employee', '=', 1)
    .count('*')
    .groupBy('id');
};

module.exports = {
  JobRole,
};
