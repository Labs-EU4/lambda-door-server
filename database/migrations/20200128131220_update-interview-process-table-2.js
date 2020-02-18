exports.up = function(knex) {
  return knex.schema.table('interview_process_reviews', table => {
    table.string('job_title');
    table
      .integer('interest_id')
      .unsigned()
      .references('id')
      .inTable('interests')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.table('interview_process_reviews', table => {
    table.dropColumn('interest_id');
    table.dropColumn('job_title');
  });
};
