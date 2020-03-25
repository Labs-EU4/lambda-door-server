const admin = require('firebase-admin');
// const serviceAccount = require('../lambda-door-firebase-adminsdk-v0gus-07f70049ac.json');
const serviceAccount = require('../lambda-door-production-firebase-adminsdk-6qlhx-7cf34d4bf8.json');
const { getUserByID } = require('./emailCronModel');
const transporter = require('./nodemailer');

// serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY.replace(
//   /\\n/g,
//   '\n'
// );
serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY_PRODUCTION.replace(
  /\\n/g,
  '\n'
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://lambda-door.firebaseio.com',
  databaseURL: 'https://lambda-door-production.firebaseio.com',
});

const db = admin.firestore();

// make it every 5 minutes
console.log(Date());

db.collection('chats')
  .where('read', '==', false)
  .where('userNotified', '==', false)
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      doc.ref
        .collection('messages')
        .orderBy('sentAt', 'desc')
        .limit(1)
        .get()
        .then(result => {
          result.forEach(message => {
            const messageTime = message.data().sentAt._seconds;
            const currentTime = Math.trunc(new Date().getTime() / 1000);

            // const limitInSeconds = 12 * 60 * 60;
            const limitInSeconds = 60 * 1;
            // lets do Math!
            if (currentTime - messageTime > limitInSeconds) {
              // uncomment this code
              db.collection('chats')
                .doc(doc.id)
                .update({
                  userNotified: true,
                });

              const userID =
                message.data().fromUserID !== doc.data().fromUserID
                  ? doc.data().fromUserID
                  : doc.data().toUserID;

              console.log('User: ', userID);

              // dedupe user before mailing?
              getUserByID(userID)
                .then(user => {
                  if (user) {
                    sendEmail(user.email_address);
                  } else {
                    console.log("Couldn't find the user", userID);
                  }
                })
                .catch(err => {
                  console.log('Error getting the user');
                });
            }
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
console.log('==========');

const sendEmail = email => {
  console.log('Email: ', email);

  const subject = 'You got unread messages';

  transporter.sendMail(
    {
      from: 'support@lambdadoor.com',
      to: email,
      subject: subject,
      template: 'chat',
      context: {
        message: subject,
        subject: subject,
      },
    },
    error => {
      if (error) {
        console.log(error);
      } else {
        console.log('mail sent');
      }
    }
  );
};
