const db = require('../database/db-config');
const { findById, findBy, insert, update } = require('./userModel');

const testUser = {
  full_name: 'Test 1',
  slack_id: 'slack_id',
  username: 'name',
  email_address: 'email_address',
  profile_picture: 'testurl',
};

const testUserTwo = {
  full_name: 'Test 2',
  slack_id: 'slack_id_two',
  username: 'second_name',
  email_address: 'email_address_two',
  profile_picture: 'testurltwo',
};

describe('User Models', () => {
  beforeAll(async () => {
    await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
    await db('users').insert(testUser);
  });
  describe('The findById function', () => {
    it('finds user by id', async () => {
      const actual = await findById(1);
      expect(actual.id).toEqual(1);
      expect(actual.email_address).toEqual(testUser.email_address);
    });

    it('returns undefined if user not found', async () => {
      const actual = await findById(2);
      expect(actual).toBeUndefined();
    });
  });
  describe('The findBy function', () => {
    it('finds user by filter: slack_id', async () => {
      const actual = await findBy(testUser.slack_id);
      expect(actual.id).toEqual(1);
      expect(actual.email_address).toEqual(testUser.email_address);
    });

    it('returns undefined if user not found', async () => {
      const actual = await findBy('nonExistentID');
      expect(actual).toBeUndefined();
    });
  });
  describe('The insert function', () => {
    it('creates a new user', async () => {
      const actual = await insert(testUserTwo);
      expect(actual.id).toEqual(2);
      expect(actual.email_address).toEqual(testUserTwo.email_address);
    });

    // it('throws error when user already exists', async () => {
    //   const actual = insert(testUserTwo);
    //   await expect(actual).rejects.toThrow('User already exists');
    // });
  });

  describe('The update function', () => {
    it("changes user's name", async () => {
      const actual = await update(1, {
        full_name: 'test name updated',
      });
      expect(actual[0].full_name).toBe('test name updated');
    });

    it("returns empty array when id doesn't exist", async () => {
      const actual = await update(3, {
        profile_picture: 'testurlupdated',
      });
      expect(actual).toEqual([]);
    });
  });

  afterAll(async () => {
    await db.raw('TRUNCATE users RESTART IDENTITY CASCADE');
  });
});
