exports.up = function(knex) {
  return knex.schema.alterTable('salary_reviews', table => {
    table
      .integer('employment_type', 1)
      .unsigned()
      .notNullable()
      .defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.table('salary_reviews', table => {
    table.dropColumn('employment_type');
  });
};
