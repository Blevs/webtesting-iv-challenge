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

  describe('get', () => {
    it('get entire database', async () => {
      await Smurfs.insert({ name: 'Henry', weight: 20 });
      await Smurfs.insert({ name: 'James', weight: 30 });
      expect(await Smurfs.get()).toEqual(await db('smurfs'));
    });
    it('get smurf by id', async () => {
      const smurf = await Smurfs.insert({ name: 'Henry', weight: 20 });
      await Smurfs.insert({ name: 'James', weight: 30 });
      expect(await Smurfs.get(smurf.id)).toEqual(smurf);
    });
  });

  describe('remove', () => {
    it('remove smurf', async () => {
      const smurf = await Smurfs.insert({ name: 'Henry', weight: 52 });
      await Smurfs.insert({ name: 'Jennie', weight: 35 });
      await Smurfs.remove(smurf.id);
      expect(await db('smurfs')).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('update smurf', async () => {
      const smurf = await Smurfs.insert({ name: 'Henry', weight: 19 });
      await Smurfs.insert({ name: 'Caroline', weight: 20 });
      await Smurfs.update(smurf.id, {name: 'NotHenry'});
      const updatedSmurf = await(Smurfs.get(smurf.id));
      expect(updatedSmurf.name).toEqual('NotHenry');
      expect(updatedSmurf.weight).toEqual(19);
    });
    it('update returns smurf', async () => {
      const smurf = await Smurfs.insert({ name: 'Henry', weight: 19 });
      await Smurfs.insert({ name: 'Caroline', weight: 20 });
      const updatedSmurf = await Smurfs.update(smurf.id, {name: 'NotHenry'});
      expect(updatedSmurf.name).toEqual('NotHenry');
      expect(updatedSmurf.weight).toEqual(19);
    });
  });
});
