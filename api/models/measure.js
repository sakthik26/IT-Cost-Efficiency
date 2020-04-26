const mongoose = require('mongoose');
const Customer = require('./customer');
const measureSchema = new mongoose.Schema({
  measureId: {
    type: String,
    required: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  externalMeasureId: {
    type: String,
    required: true
  },
  measure: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  potential: {
    type: String,
    required: true
  },
  durationInMonth: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  statusLang: {
    type: String,
    required: true
  }

});


module.exports = mongoose.model('Measures', measureSchema);


//const collectionName = "measure";

//const Model = mongoose.model('measure', measureSchema);


