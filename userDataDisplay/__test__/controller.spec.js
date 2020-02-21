const request = require('supertest');
const server = require('../../api/server');
const dbm = require('../dataDisplayModel');

describe('GET dataDisplay', () => {
  let cookie;
  it('Should fetch all description in the database', async () => {
    await dbm.JobRole();
  });

  test('returns a 200 response', async () => {
    const response = await request(server)
      .get('/dataDisplay')
      .expect('Content-Type', /json/)
      .expect(200);
    cookie = response.headers['set-cookie'];
  });
  test('returns a 200 response', async () => {
    const response = await request(server)
      .get('/dataDisplay')
      .expect('Content-Type', /charset=utf-8/);
    cookie = response.headers['set-cookie'];
  });
});
