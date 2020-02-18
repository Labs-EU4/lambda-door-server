exports.seed = function(knex) {
  // Inserts seed entries
  return knex('interests').insert([
    { interest: 'AI Engineer' },
    { interest: 'Front End' },
    { interest: 'Back End' },
    { interest: 'Full Stack' },
    { interest: 'Data Science' },
    { interest: 'Machine Learning' },
    { interest: 'User Experience' },
    { interest: 'Mobile Development' },
    { interest: 'Product Manager' },
    { interest: 'DevOps Engineer' },
    { interest: 'Technical Lead' },
  ]);
};
