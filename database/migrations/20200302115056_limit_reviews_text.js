exports.up = function(knex) {
  return knex.schema.alterTable('interview_process_reviews', table => {
    table.varchar('text').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('interview_process_reviews', table => {
    table.text('text').alter();
  });
};
