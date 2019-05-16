const express = require('express');
const Smurfs = require('./model.js');

const router = express.Router();

router.post('/', (req, res) => {
  const smurf = req.body;
  if (smurf && smurf.name && smurf.weight) {
    console.log(smurf);
    Smurfs.insert(smurf)
      .then(smurf => res.status(201).json(smurf))
      .catch(() => res.status(500).json({message: 'Error inserting smurf'}));
  } else {
    res.status(400).json({message: 'Requires name and weight'});
  }
});

module.exports = router;
