const express = require('express');
const Smurfs = require('./model.js');

const router = express.Router();

router.post('/', (req, res) => {
  const smurf = req.body;
  if (smurf && smurf.name && smurf.weight) {
    Smurfs.insert(smurf)
      .then(smurf => res.status(201).json(smurf))
      .catch(() => res.status(500).json({message: 'Error inserting smurf'}));
  } else {
    res.status(400).json({message: 'Requires name and weight'});
  }
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  Smurfs.remove(id)
    .then(deleted => deleted
          ? res.status(204).end()
          : res.status(404).json({message: 'Smurf with id does not exist'}))
    .catch(() => res.status(500).json({message: 'Error deleting smurf'}));
});

module.exports = router;
