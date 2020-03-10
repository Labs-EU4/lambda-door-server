/* eslint-disable node/no-unsupported-features/es-syntax */
const request = require('supertest');
const db = require('../../database/db-config');
const server = require('../../api/server');

const testUsers = [
  {
    full_name: 'Test 2',
    slack_id: 'slack_id_two',
    username: 'second_name',
    email_address: 'email_address_two',
    profile_picture: 'testurltwo',
  },
  {
    full_name: 'Test 1',
    slack_id: 'slack_id_one',
    username: 'first_name',
    email_address: 'email_address_one',
    profile_picture: 'testurlone',
  },
  {
    full_name: 'Test 3',
    slack_id: 'slack_id_three',
    username: 'third_name',
    email_address: 'email_address_three',
    profile_picture: 'testurlthree',
  },
];

const testCompany = {
  id: 1,
  name: 'Accenture',
  website: 'www.accenture.com.',
  location: 'Atlanta, GA',
  longitude: -85.0,
  latitude: 33.7537,
  type: 'Business',
  logo: '',
  description:
    'We partner with our clients to drive real innovation—the kind that turns an idea into an industry.',
};

const testInterest = {
  interest: 'Software Engineer',
};

const testCompanyReview = {
  ratings: 4,
  is_currently_employed: 1,
  review_headline: 'Great Company to work for',
  review:
    'Extremely good benefits from healthcare, PTO, and discounts. Very relaxed environment with clearly laid out expectations.',
  is_accepting_questions: 0,
  user_id: 1,
  company_id: 1,
};

const testInterviewReview = {
  user_id: 1,
  company_id: 1,
  text:
    'Six rounds of phone/tech interviews over a long time period. It seemed a bit scattered and could have been way more efficient. I felt like some of the interviews got repetitive.',
  is_accepting_questions: 0,
  is_current_employee: 0,
  job_title: null,
};

const testSalaryReview = {
  user_id: 1,
  company_id: 1,
  base_salary: 8333,
  description: 'Software Engineer',
  salary: 3000000,
  currency: 'Nigerian Naira',
  is_accepting_questions: 0,
  is_current_employee: 0,
  job_title: 'Junior Developer',
  is_anonymous: false,
};

beforeAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE interests RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE company_reviews RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE interview_process_reviews RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE salary_reviews RESTART IDENTITY CASCADE');
  await db('users').insert(testUsers);
  await db('companies').insert(testCompany);
  await db('interests').insert(testInterest);
  await db('company_reviews').insert(testCompanyReview);
  await db('interview_process_reviews').insert(testInterviewReview);
  await db('salary_reviews').insert(testSalaryReview);
});

describe('searchCompanies router', () => {
  describe('GET /search/companies?search_query=acc', () => {
    test('returns a 200 response if there is a valid result', async () => {
      await request(server)
        .get('/search/companies?search_query=acc')
        .expect(200);
    });
  });
});

describe('searchSalaries router', () => {
  describe('GET /search/salaries?search_query=dev', () => {
    test('returns a 200 response if there is a valid result', async () => {
      await request(server)
        .get('/search/salaries?search_query=dev')
        .expect(200);
    });
  });
});

describe('searchInterviews router', () => {
  describe('GET /search/interviews?search_query=acc', () => {
    test('returns a 200 response if there is a valid result', async () => {
      await request(server)
        .get('/search/interviews?search_query=acc')
        .expect(200);
    });
  });
});

afterAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE interests RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE company_reviews RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE interview_process_reviews RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE salary_reviews RESTART IDENTITY CASCADE');
});
