const db = require('../database/db-config');

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findBy(filter) {
  return db('users')
    .where('slack_id', '=', filter)
    .first();
}

function insert(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(id, changes) {
  return db('users')
    .update(changes, ['*'])
    .where({ id });
}

module.exports = {
  findById,
  findBy,
  insert,
  update,
};
