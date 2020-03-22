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

// Update one subscriber
//router.patch('/:id', (req, res) => {
//})

// Delete one subscriber
//router.delete('/:id', (req, res) => {
//})

module.exports = router;