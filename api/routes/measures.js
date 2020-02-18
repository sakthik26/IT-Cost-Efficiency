const express = require('express')
const router = express.Router()
const Measure = require('../models/measure')


// Get all subscribers
router.get('/', (req, res) => {
    try {
        const measures = Measure.find()
        res.json(measures)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Get one subscriber
router.get('/:id', (req, res) => {
})

// Create one subscriber
router.post('/', (req, res) => {
    const measure = new Measure({
        MEASURE_ID: req.body.MEASURE_ID
      })
    
      try {
        const newMeasure = measure.save()
        res.status(201).json(newMeasure)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
})

// Update one subscriber
router.patch('/:id', (req, res) => {
})

// Delete one subscriber
router.delete('/:id', (req, res) => {
})

module.exports = router