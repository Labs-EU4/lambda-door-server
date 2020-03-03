exports.seed = function(knex) {
  // Inserts seed entries
  return knex('interview_process_reviews').insert([
    {
      user_id: 4,
      company_id: 1,
      text:
        'Six rounds of phone/tech interviews over a long time period. It seemed a bit scattered and could have been way more efficient. I felt like some of the interviews got repetitive.',
      is_accepting_questions: 1,
      is_current_employee: 0,
    },
    {
      user_id: 2,
      company_id: 5,
      text:
        'Very pleasant recruiters. First a phone interview that took about 15 minutes. Followed by two Skype interviews; first with a recruiter after that with a manager.Basic trouble shooting questions. They want to really get to know you as a person. Just be yourself and do not be afraid to be geeky/nerdy! Make sure you have a desk and dedicated home phone line.',
      is_accepting_questions: 0,
      is_current_employee: 0,
    },
    {
      user_id: 4,
      company_id: 11,
      text:
        'Completed their developer challenge and received an email offering an interview. A few preliminary questions via email. Scheduled a phone interview. The recruiter did not call me, and did not respond to my email asking why they missed the scheduled interview. I am not sure what happened, but after scheduling the interview, there is no reason to not show up.',
      is_accepting_questions: 0,
      is_current_employee: 0,
    },
    {
      user_id: 3,
      company_id: 6,
      text:
        'There is one phone interview for an hour. If you clear this interview, you will be invited for an onsite interview. There are five interviews onsite, all in one day. Interviews are in a casual environment. After the first two interviews, you take a break and are escorted for lunch.',
      is_accepting_questions: 0,
      is_current_employee: 0,
    },
  ]);
};
