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

const interest3 = {
  interest: 'Software Engineer',
};

const testCompany3 = {
  id: 1,
  name: 'Accenture',
  website: 'www.accenture.com.',
  location: 'Atlanta, GA',
  longitude: -85.0,
  latitude: 33.7537,
  type: 'Business',
  logo: '',
  description: '',
};

const testReview3 = {
  user_id: 1,
  company_id: 1,
  description: 'Junior Developer',
  base_salary: 8333,
  salary: 3000000,
  currency: 'NGN',
  is_accepting_questions: 1,
  is_current_employee: 1,
  is_anonymous: 1,
  job_title: 'Junior Dev',
  employment_type: 2,
};

const testSalaryReviews = [
  {
    user_id: 3,
    company_id: 1,
    description: 'Junior Developer',
    base_salary: 10833,
    salary: 3900000,
    currency: 'NGN',
    is_accepting_questions: 1,
    is_current_employee: 1,
    is_anonymous: 1,
    job_title: 'Junior Dev',
    employment_type: 1,
  },

  {
    user_id: 2,
    company_id: 1,
    description: 'Junior Developer',
    base_salary: 9722,
    salary: 3500000,
    currency: 'NGN',
    is_accepting_questions: 1,
    is_current_employee: 1,
    is_anonymous: 1,
    job_title: 'Junior Dev',
    employment_type: 4,
  },
];

beforeAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE interests RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE salary_reviews RESTART IDENTITY CASCADE');

  await db('users').insert(testUsers);
  await db('companies').insert(testCompany3);
  await db('interests').insert(interest3);
  await db('salary_reviews').insert(testSalaryReviews);
});

describe('salaryReviews router', () => {
  describe('GET /user/:id', () => {
    test('returns a 200 response if user exists', async () => {
      await request(server)
        .get('/salaryreviews/user/1')
        .expect(200);
    });

    test("returns a 400 if user doesn't exist", async () => {
      await request(server)
        .get('/salaryreviews/user/4')
        .expect(400);
    });
  });

  describe('PATCH /:id', () => {
    test('returns a 200 response if salary review exists', async () => {
      const response = await request(server)
        .patch('/salaryreviews/1')
        .send({ salary: 2800000 })
        .expect(200);

      expect(response.body.salary).toEqual(2800000);
    });

    test("returns a 400 if salary review doesn't exist", async () => {
      await request(server)
        .patch('/salaryreviews/4')
        .expect(400);
    });
  });

  describe('DELETE /:id', () => {
    test('returns a 204 response if salary review exists', async () => {
      await request(server)
        .delete('/salaryreviews/1')
        .expect(204);
    });

    test("returns a 400 if salary review doesn't exist", async () => {
      await request(server)
        .delete('/salaryreviews/4')
        .expect(400);
    });
  });

  describe('POST /', () => {
    test('returns a 201 response if user created salary review succesfully', async () => {
      const response = await request(server)
        .post('/salaryreviews/')
        .send(testReview3)
        .expect(201);

      expect(response.body.job_title).toBe('Junior Dev');
    });
  });

  describe('GET /salaryreviews/reviews/:id', () => {
    test('returns a 200 response if salary review was fetched succesfully', async () => {
      await request(server)
        .get('/salaryreviews/reviews/1')
        .expect(200);
    });
  });

  describe('GET /salaryreviews/avg/:id', () => {
    test('returns a 200 response if successful', async () => {
      await request(server)
        .get('/salaryreviews/avg/1')
        .expect(200);
    });
    test('returns the average salary for an interest', async () => {
      const response = await request(server)
        .get('/salaryreviews/avg/1')
        .send(testSalaryReviews);
      expect(response.body[0].avg).toBe(3250000);
    });
  });
});

afterAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE salary_reviews RESTART IDENTITY CASCADE');
});
