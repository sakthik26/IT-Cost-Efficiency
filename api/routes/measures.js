const express = require('express');
const router = express.Router();
const Measure = require('../models/measure');


// Get all subscribers
router.get('/', async (req, res) => {
  //res.send('it works')
  try {
    const measures = await Measure.find()
    res.json(measures)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})



// Get one subscriber
//router.get('/:id', async (req, res) => {
//})

// Create one subscriber
router.post('/', (req, res) => {
  const measure = new Measure({
    measureId: req.body.measureId,
    customerId: req.body.customerId,
    externalMeasureId: req.body.externalMeasureId,
    measure: req.body.measure,
    description: req.body.description,
    potential: req.body.potential,
    durationInMonth: req.body.durationInMonth,
    status: req.body.status,
    statusLang: req.body.statusLang
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
router.put('/:measureId', async (req, res) => {
  try {
    const updatedMeasure = await Measure.findOneAndUpdate(
      { measureId: req.params.measureId },
      {
        $set: {
          measureId: req.body.measureId, customerId: req.body.customerId, externalMeasureId: req.body.externalMeasureId,
          measure: req.body.measure, description: req.body.description, potential: req.body.potential, durationInMonth: req.body.durationInMonth,
          status: req.body.status, statusLang: req.body.statusLang
        }
      }
    )
    res.json(updatedMeasure)
  } catch (err) {
    res.json({ message: err });
  }
});


// Delete measure based on id 
router.delete('/:measureId', async (req, res) => {
  try {
    const removedMeasure = await Measure.remove({ measureId: req.params.measureId })
    res.json(removedMeasure)
  } catch (err) {
    res.json({ message: err })
  }

});

module.exports = router;