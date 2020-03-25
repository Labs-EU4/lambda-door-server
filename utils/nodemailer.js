const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'ariane.beatty@ethereal.email',
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.handlebars',
      partialsDir: './',
      layoutsDir: './templates',
      defaultLayout: 'referral.hbs',
    },
    viewPath: './templates',
    extName: '.hbs',
  })
);

module.exports = transporter;
