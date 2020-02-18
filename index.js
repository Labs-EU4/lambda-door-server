const Sentry = require('@sentry/node');
const server = require('./api/server');

const PORT = process.env.PORT || 3333;

Sentry.init({
  dsn: 'https://6abb2956c3654015b539dbefcf05583b@sentry.io/2231904',
});

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
