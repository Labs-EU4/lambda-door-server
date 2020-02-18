exports.up = function(knex) {
  return knex.schema.table('interview_process_reviews', table => {
    table.boolean('is_accepting_questions');
    table.boolean('is_current_employee');
  });
};

exports.down = function(knex) {
  return knex.schema.table('interview_process_reviews', table => {
    table.dropColumn('is_current_employee');
    table.dropColumn('is_accepting_questions');
  });
};
