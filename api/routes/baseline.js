const express = require('express');
const router = express.Router();
const Baseline = require("../models/baseline");


// Gets all the baselines
router.get('/', async (req, res) => {
  //res.send('it works');
    try {
       const baseline = await Baseline.find()
       res.json(baseline)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Creates new baseline in the database
router.post('/', (req, res) => {
    const baseline  = new Baseline({
      customerId: req.body.customerId,
      description: req.body.description
    });
  
    baseline.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });



  module.exports = router;