exports.seed = function(knex) {
  // Inserts seed entries
  return knex('user_interests').insert([
    { user_id: 2, interest_id: 1 },
    { user_id: 2, interest_id: 2 },
    { user_id: 2, interest_id: 3 },
    { user_id: 2, interest_id: 4 },
    { user_id: 1, interest_id: 5 },
    { user_id: 2, interest_id: 5 },
    { user_id: 3, interest_id: 2 },
    { user_id: 4, interest_id: 1 },
    { user_id: 5, interest_id: 6 },
  ]);
};
