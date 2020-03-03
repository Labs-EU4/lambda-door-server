const request = require('supertest');
const db = require('../../database/db-config');
const server = require('../../api/server');

const testUser3 = {
  full_name: 'Test 2',
  slack_id: 'slack_id_two',
  username: 'second_name',
  email_address: 'email_address_two',
  profile_picture: 'testurltwo',
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
  text: 'Good Review',
  job_title: 'React Developer',
};

const testInterest = {
  interest: 'Software Engineer',
};

beforeAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE interests RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE interview_process_reviews RESTART IDENTITY CASCADE');

  await db('users').insert(testUser3);
  await db('companies').insert(testCompany3);
  await db('interests').insert(testInterest);
  await db('interview_process_reviews').insert(testReview3);
});

describe('interests router', () => {
  describe('GET /interests', () => {
    test('returns a 200 response if interests exists', async () => {
      await request(server)
        .get('/interests')
        .expect(200);
    });
  });

  describe('GET /interests/:id', () => {
    test('returns a 200 response if interest exists', async () => {
      await request(server)
        .get('/interests/1')
        .expect(200);
    });

    test('returns a 400 response if interest does not exist', async () => {
      await request(server)
        .get('/interests/100')
        .expect(400);
    });
  });

  describe('GET /interests/user/:id', () => {
    test('returns a 200 response if user exists', async () => {
      await request(server)
        .get('/interests/user/1')
        .expect(200);
    });
    test('returns a 400 response if user does not exist', async () => {
      await request(server)
        .get('/interests/user/15')
        .expect(400);
    });
  });

  describe('GET /interests/ui/:id', () => {
    test('returns a 400 response if user interest does not exist', async () => {
      await request(server)
        .get('/interests/ui/1')
        .expect(400);
    });
  });
  describe('DELETE /interests/ui/:id', () => {
    test("returns a 400 if interview review doesn't exist", async () => {
      await request(server)
        .delete('/interests/ui/3')
        .expect(400);
    });
  });
});

afterAll(async () => {
  await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
  await db.raw('TRUNCATE company_reviews RESTART IDENTITY CASCADE');
});
