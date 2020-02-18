exports.seed = function(knex) {
  // Inserts seed entries
  return knex('company_reviews').insert([
    {
      user_id: 4,
      company_id: 10,
      ratings: 4,
      is_currently_employed: 1,
      review_headline: 'Great Company to work for',
      review:
        'Extremely good benefits from healthcare, PTO, and discounts. Very relaxed environment with clearly laid out expectations.',
      is_accepting_questions: 1,
    },
    {
      user_id: 1,
      company_id: 5,
      ratings: 5,
      is_currently_employed: 1,
      review_headline:
        'Challenging, Rewarding, but ZERO work/life balance. Most satisfying , most difficult and most rewarding job ever.',
      review: 'most rewarding job ever.',
      is_accepting_questions: 1,
    },
    {
      user_id: 3,
      company_id: 1,
      ratings: 5,
      is_currently_employed: 1,
      review_headline: 'Flexible Working Hours and Great Benefits.',
      review: 'They care about you',
      is_accepting_questions: 1,
    },
    {
      user_id: 4,
      company_id: 1,
      ratings: 4,
      is_currently_employed: 0,
      review_headline: 'Very good',
      review: 'I work in Accenture',
      is_accepting_questions: 0,
    },
  ]);
};
