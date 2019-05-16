const request = require('supertest');
const server = require('../server.js');

describe('smurfs routes', () => {
  it('in test environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});
