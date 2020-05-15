const express = require('express');
const router = express.Router();
const BaselineBreakdown = require("../models/baselineBreakdown");


// Gets all the baseline breakdown
router.get('/', async (req, res) => {
  //res.send('it works');
    try {
       const baselineBreakdown = await BaselineBreakdown.find()
       res.json(baselineBreakdown)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Creates new baseline breakdown in the database
router.post('/', (req, res) => {
    const baselineBreakdown  = new BaselineBreakdown({
      baselineId: req.body.baselineId,
      costTypeId: req.body.costTypeId,
      amount: req.body.amount
    });
  
    baselineBreakdown.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });



  module.exports = router;