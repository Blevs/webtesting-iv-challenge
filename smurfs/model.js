const db = require('../data/dbConfig.js');

module.exports = {
  get,
  insert,
  remove,
  update,
};

function get(id) {
  if (id) {
    return db('smurfs').where({id}).first();
  } else {
    return db('smurfs');
  }
}

function insert(smurf) {
  return db('smurfs').insert(smurf, 'id').then(([id]) => get(id));
}

function remove(id) {
  return db('smurfs').where({id}).del();
}

function update(id, changes) {
  return db('smurfs').where({id}).update(changes, 'id').then(updated  => updated ? get(id) : null);
}


