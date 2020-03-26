const db = require('../database/db-config');

function getUserByID(id) {
  return db('users')
    .where('id', '=', id)
    .first();
}

module.exports = {
  getUserByID,
};
