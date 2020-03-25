const admin = require('firebase-admin');
const atob = require('atob');
const serviceAccount = require('../lambda-door-firebase-adminsdk-v0gus-07f70049ac.json');

require('dotenv').config();

serviceAccount.private_key = atob(
  process.env.FIREBASE_PRIVATE_KEY_BASE64
).replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lambda-door.firebaseio.com',
});

const db = admin.firestore();

beforeAll(async () => {});

describe('email', () => {
  describe('have users been notified', () => {
    test('userNotified', async () => {
      const data = await db
        .collection('chats')
        .where('read', '==', false)
        .where('userNotified', '==', false)
        .get();

      if (data.size) {
        // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
        for (const doc of data.docs) {
          const messages = await doc.ref
            .collection('messages')
            .orderBy('sentAt', 'desc')
            .limit(1)
            .get();

          const messageTime = messages.docs[0].data().sentAt._seconds;
          const currentTime = Math.trunc(new Date().getTime() / 1000);
          const limitInSeconds = 60 * 30;

          expect(currentTime - messageTime < limitInSeconds).toBe(true);
        }
      }
    });
  });
});
afterAll(async () => {});
