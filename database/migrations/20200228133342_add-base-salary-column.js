
exports.up = function (knex) {
  return knex.schema.table('salary_reviews', table => {
    table.float('base_salary')
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('salary_reviews', table => {
    table.dropColumn('base_salary');
  });
};
