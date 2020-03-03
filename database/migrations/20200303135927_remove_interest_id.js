exports.up = function(knex) {
  return knex.schema
    .table('interview_process_reviews', table => {
      table.dropColumn('interest_id');
    })
    .table('salary_reviews', table => {
      table.dropColumn('interest_id');
    });
};

exports.down = function(knex) {
  return knex.schema
    .table('interview_process_reviews', table => {
      table
        .integer('interest_id', 128)
        .unsigned()
        .nullable()
        .references('id')
        .inTable('interests')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      //   .defaultTo(0);
    })
    .table('salary_reviews', table => {
      table
        .integer('interest_id', 128)
        .unsigned()
        .nullable()
        .references('id')
        .inTable('interests')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      //   .defaultTo(0);
    });
};
