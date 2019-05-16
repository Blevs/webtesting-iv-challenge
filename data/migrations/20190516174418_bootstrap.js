exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('smurfs', tbl => {
      tbl.increments();
      tbl.string('name').unique().notNullable();
      tbl.integer('weight').unsigned().notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('smurfs');
};
