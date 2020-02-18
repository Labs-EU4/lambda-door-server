const db = require('../../database/db-config');

function findAll() {
  return db('interests');
}

function findById(id) {
  return db('interests')
    .where({ id })
    .first();
}
function findUserInterestById(id) {
  return db
    .select('u.id', 'i.id as interest_id', 'i.interest', 'u.user_id')
    .from('user_interests as u')
    .join('interests as i', 'i.id', 'u.interest_id')
    .where('u.id', '=', id)
    .first();
}

// eslint-disable-next-line camelcase
function findByUserId(user_id) {
  return db
    .select('u.id', 'i.interest', 'u.user_id')
    .from('user_interests as u')
    .join('interests as i', 'i.id', 'u.interest_id')
    .where('u.user_id', '=', user_id);
}

// eslint-disable-next-line camelcase
function insert(user_interests) {
  return db('user_interests')
    .insert(user_interests, 'id')
    .then(ids => {
      return findByUserId(ids[0]);
    });
}

function update(id, changes) {
  return db('user_interests')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('user_interests')
    .where({ id: id })
    .del();
}

module.exports = {
  findAll,
  findById,
  findByUserId,
  findUserInterestById,
  insert,
  update,
  remove,
};
