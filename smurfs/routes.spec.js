const request = require('supertest');
const server = require('../server.js');
const db = require('../data/dbConfig.js');

describe('smurfs routes', () => {
  afterEach(async () => {
    await db('smurfs').truncate();
  });

  it('in test environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('post /', () => {
    it('create new smurf', async () => {
      const res = await request(server).post('/api/smurfs/').send({name: 'Henry', weight: 200});
      expect(res.status).toBe(201);
    });
    it('post returns smurf', async () => {
      const res = await request(server).post('/api/smurfs/').send({name: 'Henry', weight: 200});
      expect(res.body.name).toBe('Henry');
      expect(res.body.weight).toBe(200);
    });
    it('Error on insufficient info', async () => {
      let res = await request(server).post('/api/smurfs/').send({weight: 200});
      expect(res.status).toBe(400);
      res = await request(server).post('/api/smurfs/').send({name: 'Test'});
      expect(res.status).toBe(400);
    });
  });
});
