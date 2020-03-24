const express = require('express');
const router = express.Router();
const Measure = require('../models/measure');


// Gets all the measures
router.get('/', async (req, res) => {
  //res.send('it works')
  try {
       const measures = await Measure.find()
       res.json(measures)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Gets only specific measure

router.get('/:measureId', async (req, res) => {
  try {
      const measure = await Measure.findById(req.params.measureId)
      res.json(measure)
  } catch (err) {
      res.json({ message: err })
  }
})



// Creates Measures in the database
router.post('/', (req, res) => {
      const measure = new Measure({
        MEASURE_ID: req.body.MEASURE_ID,
        CUSTOMER_ID: req.body.CUSTOMER_ID,
        EXTERNALMEASURE_ID: req.body.EXTERNALMEASURE_ID,
        measure: req.body.measure,
        description: req.body.description,
        potential: req.body.potential,
        durationInMonth: req.body.durationInMonth,
        Status: req.body.Status,
        StatusLang: req.body.StatusLang
      });
    
     /* try {
        const newMeasure = await measure.save()
        res.status(201).json(newMeasure)
      } catch (err) {
        res.status(400).json({ message: err.message })
      } */
      measure.save()
      .then(data => {
          res.json(data);
      })
      .catch(err => {
          res.json({ message: err });
      });
});


// Update all fields of a measure based on id
router.patch('/:measureId', async (req, res) => { 
  try {
      const updatedMeasure = await Measure.findOneAndUpdate(
        { _id: req.params.measureId  }, 
        { $set: { MEASURE_ID: req.body.MEASURE_ID, CUSTOMER_ID: req.body.CUSTOMER_ID, EXTERNALMEASURE_ID: req.body.EXTERNALMEASURE_ID,
          measure: req.body.measure, description: req.body.description, potential: req.body.potential, durationInMonth: req.body.durationInMonth,
          Status: req.body.Status, StatusLang: req.body.StatusLang } }
       ) 
       res.json(updatedMeasure)
      } catch (err) {
        res.json({ message: err });
    }
});


// Delete measure based on id 
router.delete('/:measureId', async (req, res) => { 
  try { 
      const removedMeasure = await Measure.remove({ _id: req.params.measureId })
      res.json(removedMeasure)
  } catch (err) {
      res.json({ message: err })
  }

});

module.exports = router;