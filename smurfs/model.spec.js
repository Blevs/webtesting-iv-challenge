const db = require('../data/dbConfig.js');
const Smurfs = require('./model.js');

describe('smurfs model', () => {
  afterEach(async () => {
    await db('smurfs').truncate();
  });
  describe('insert', () => {
    it('insert a smurf', async () => {
      await Smurfs.insert({ name: 'Henry', weight: 20 });
      expect(await db('smurfs')).toHaveLength(1);
    });
    it('insert returns new smurf', async () => {
      let smurf = await Smurfs.insert({ name: 'Henry', weight: 20 });
      expect(smurf.name).toBe('Henry');
      expect(smurf.weight).toBe(20);
      smurf = await Smurfs.insert({ name: 'Edward', weight: 15 });
      expect(smurf.name).toBe('Edward');
      expect(smurf.weight).toBe(15);
    });
    it('enforce unique name', async () => {
      let smurf = await Smurfs.insert({ name: 'Henry', weight: 20 });
      expect(smurf.name).toBe('Henry');
      await expect(Smurfs.insert({ name: 'Henry', weight: 15 })).rejects.toThrow(/UNIQUE/i);
    });
    it('enforce required columns', async () => {
      await expect(Smurfs.insert({})).rejects.toThrow(/NOT NULL/i);
    });
  });
});
