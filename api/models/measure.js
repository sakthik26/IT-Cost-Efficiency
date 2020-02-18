const mongoose = require('mongoose')

const measureSchema = new mongoose.Schema({
  MEASURE_ID: {
    type: Number,
    required: true
  },
  CUSTOMER_ID: {
    type: Number,
    required: true
  },
  EXTERNALMEASURE_ID: {
    type: Number,
    required: true,
  },
  measure: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,   
  },
  potential: {
    type: String,
    required: true,   
  },
  durationInMonth: {
    type: Date,
    required: true,   
    default: Date.now
  },
  Status: {
    type: String,
    required: true,   
  },
  StatusLang: {
    type: String,
    required: true,   
  }
})

module.exports = mongoose.model('Measure', measureSchema)
