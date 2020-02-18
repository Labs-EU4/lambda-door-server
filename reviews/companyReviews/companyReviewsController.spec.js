/* eslint-disable node/no-unsupported-features/es-syntax */
const request = require('supertest');
const db = require('../../database/db-config');
const server = require('../../api/server');

const testUser = {
  full_name: 'Test 2',
  slack_id: 'slack_id_two',
  username: 'second_name',
  email_address: 'email_address_two',
  profile_picture: 'testurltwo',
};

const testCompany = {
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

const testReview = {
  user_id: 1,
  company_id: 1,
  ratings: 4,
  is_currently_employed: 1,
  review_headline: 'Great Company to work for',
  review:
    'Extremely good benefits from healthcare, PTO, and discounts. Very relaxed environment with clearly laid out expectations.',
  is_accepting_questions: 0,
};

beforeAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE company_reviews RESTART IDENTITY CASCADE');

  await db('users').insert(testUser);
  await db('companies').insert(testCompany);
  await db('company_reviews').insert(testReview);
});

describe('companyReviews router', () => {
  describe('GET /user/:id', () => {
    test('returns a 200 response if user exists', async () => {
      await request(server)
        .get('/companyreviews/user/1')
        .expect(200);
    });

    test("returns a 400 if user doesn't exist", async () => {
      await request(server)
        .get('/companyreviews/user/2')
        .expect(400)
        .expect({ error: 'User does not exist' });
    });
  });

  describe('companyReviews router', () => {
    describe('GET /:id', () => {
      test('returns a 200 response if review exists', async () => {
        await request(server)
          .get('/companyreviews/1')
          .expect(200);
      });
    });
  });

  describe('PATCH /:id', () => {
    test('returns a 200 response if review exists', async () => {
      const response = await request(server)
        .patch('/companyreviews/1')
        .send({ ratings: 5 })
        .expect(200);

      expect(response.body.ratings).toBe(5);
    });

    test("returns a 400 if review doesn't exist", async () => {
      await request(server)
        .patch('/companyreviews/2')
        .expect(400);
    });
  });

  describe('DELETE /:id', () => {
    test('returns a 204 response if review exists', async () => {
      await request(server)
        .delete('/companyreviews/1')
        .expect(204);
    });

    test("returns a 400 if review doesn't exist", async () => {
      await request(server)
        .delete('/companyreviews/2')
        .expect(400);
    });
  });

  describe('POST /:id', () => {
    test('returns a 201 response if user created succesfully', async () => {
      const response = await request(server)
        .post('/companyreviews/1')
        .send(testReview)
        .expect(201);

      expect(response.body.ratings).toBe(4);
    });

    test('returns a 400 if review not filled properly', async () => {
      await request(server)
        .post('/companyreviews/2')
        .expect(400);
    });
  });

  describe('GET /companyreviews/reviews/:id', () => {
    test('returns a 200 response if review was fetched succesfully', async () => {
      await request(server)
        .get('/companyreviews/reviews/1')
        .expect(200);
    });
  });
});

afterAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE company_reviews RESTART IDENTITY CASCADE');
});
