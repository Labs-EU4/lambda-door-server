const db = require('../../../database/db-config');
const {
  deleteInterviewReview,
  insertInterviewReview,
  updateInterviewReview,
  getUsersInterviewReviews,
  findInterviewReviewById,
  interviewReviewByCompanyId,
} = require('../interviewReviewModel');

const testUser2 = {
  full_name: 'Test 2',
  slack_id: 'slack_id_two',
  username: 'second_name',
  email_address: 'email_address_two',
  profile_picture: 'testurltwo',
};

const testCompany2 = {
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

describe('Review Models', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE interview_process_reviews RESTART IDENTITY CASCADE');

    await db('users').insert(testUser2);
    await db('companies').insert(testCompany2);
    await db('interview_process_reviews').insert(testReview3);
  });
  describe('interviewReviewByCompanyId function', () => {
    it('gets all interview reviews for a company id', async () => {
      const actual = await interviewReviewByCompanyId(1);
      expect(actual.length).toBe(1);
    });
  });
  describe('getUsersInterviewReviews function', () => {
    it('gets all interview reviews for a user id', async () => {
      const actual = await getUsersInterviewReviews(1);
      expect(actual.length).toEqual(1);
    });

    it('returns undefined if user not found', async () => {
      const actual = await getUsersInterviewReviews(2);
      expect(actual.length).toEqual(0);
    });
  });
  describe('findInterviewReviewById function', () => {
    it('find interview review by review id', async () => {
      const actual = await findInterviewReviewById(1);
      expect(actual.id).toEqual(1);
    });

    it('returns undefined if interview review is not found', async () => {
      const actual = await findInterviewReviewById(3);
      expect(actual).toBeUndefined();
    });
  });
  describe('updateInterviewReview function', () => {
    it('updates an interview review', async () => {
      await updateInterviewReview(1, { text: 'New text' });
      const actual = await findInterviewReviewById(1);
      expect(actual.text).toEqual('New text');
    });
  });
  describe('deleteInterviewReview function', () => {
    it('deletes an interview review', async () => {
      await deleteInterviewReview(1);
      const actual = await getUsersInterviewReviews(1);
      expect(actual.length).toEqual(0);
    });
  });

  afterAll(async () => {
    await db.raw('TRUNCATE interview_process_reviews RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  });
});
