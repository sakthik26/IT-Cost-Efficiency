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

// Update one subscriber
//router.patch('/:id', (req, res) => {
//})

// Delete one subscriber
//router.delete('/:id', (req, res) => {
//})

module.exports = router;