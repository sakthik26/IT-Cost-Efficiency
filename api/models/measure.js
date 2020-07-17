const mongoose = require('mongoose');
const Customer = require('./customer');
const measureSchema = new mongoose.Schema({
  measureId: {
    type: mongoose.Schema.Types.ObjectId
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  customer: {
    type: String
  },
  externalMeasureId: {
    type: String,
    default: '100'
  },
  measure: {
    type: String
  },
  description: {
    type: String
  },
  potential: {
    type: String,
    default: 'Good'
  },
  durationInMonth: {
    type: String,
    default: '5'
  },
  status: {
    type: String,
    default: 'Active'
  },
  statusLang: {
    type: String,
    default: 'five months'
  }

});


module.exports = mongoose.model('Measures', measureSchema);


//const collectionName = "measure";

//const Model = mongoose.model('measure', measureSchema);


