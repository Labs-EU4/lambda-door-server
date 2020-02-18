const db = require('../../database/db-config');
const {
  deleteReview,
  findReviewById,
  getReviews,
  updateReview,
  findReviewByCompanyId,
} = require('./companyReviewsModel');

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

describe('Review Models', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE companies RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE company_reviews RESTART IDENTITY CASCADE');

    await db('users').insert(testUser);
    await db('companies').insert(testCompany);
    await db('company_reviews').insert(testReview);
  });
  describe('getReviews function', () => {
    it('gets all reviews for a company id', async () => {
      const actual = await findReviewByCompanyId(1);
      expect(actual.length).toBe(1);
    });
  });
  describe('getReviews function', () => {
    it('gets all reviews for a user id', async () => {
      const actual = await getReviews(1);
      expect(actual.length).toEqual(1);
      expect(actual[0].user_id).toEqual(1);
    });

    it('returns undefined if user not found', async () => {
      const actual = await getReviews(2);
      expect(actual.length).toEqual(0);
    });
  });
  describe('findReview function', () => {
    it('find review by review id', async () => {
      const actual = await findReviewById(1);
      expect(actual.id).toEqual(1);
    });

    it('returns undefined if review is not found', async () => {
      const actual = await findReviewById(2);
      expect(actual).toBeUndefined();
    });
  });
  describe('updateUserReview function', () => {
    it('updates a review', async () => {
      await updateReview(1, { ratings: 5, is_currently_employed: 0 });
      const actual = await findReviewById(1);
      expect(actual.ratings).toEqual(5);
      expect(actual.is_currently_employed).toEqual(false);
    });
  });
  describe('deleteReview function', () => {
    it('deletes a review', async () => {
      await deleteReview(1);
      const actual = await getReviews(1);
      expect(actual.length).toEqual(0);
    });
  });

  afterAll(async () => {
    await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  });
});
