exports.up = function(knex) {
  return knex.schema.table('salary_reviews', table => {
    table.string('job_title');
    table.boolean('is_anonymous');
  });
};

exports.down = function(knex) {
  return knex.schema.table('salary_reviews', table => {
    table.dropColumn('is_anonymous');
    table.dropColumn('job_title');
  });
};
