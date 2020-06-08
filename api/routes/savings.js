const express = require('express');
const router = express.Router();
const Savings = require("../models/savings");
const Measures = require("../models/measure");


// Gets all the savings
router.get('/', async (req, res) => {
  try {
    const savings = await Savings.find()
    res.json(savings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

// Creates new savings in the database
router.post('/', async (req, res) => {

    const savings  = new Savings({
      measure: req.body.measure,
      totaCost: req.body.totaCost,
      realized: req.body.realized,
      savingPerYear: req.body.savingPerYear,
      impactDate: req.body.impactDate,
      startingDate: req.body.startingDate,
      finishDate: req.body.finishDate
    });

    //compare measure name from measures and savings collections and assign corresponding measureId
    const measures = await Measures.findOne({ measure: req.body.measure });
    if(savings.measure == measures.measure)
    {
        savings.measureId = measures._id;
    }  
  
    savings.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });


  router.delete('/:measure', async (req, res) => {
    try {
        const removedSaving = await Savings.remove({ measure: req.params.measure })
        res.json(removedSaving)
    } catch (err) {
        res.json({ message: err })
    }

});

  module.exports = router;