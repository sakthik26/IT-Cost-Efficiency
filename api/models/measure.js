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
  externalMeasureId: {
    type: String
  },
  measure: {
    type: String
  },
  description: {
    type: String
  },
  potential: {
    type: String
  },
  durationInMonth: {
    type: String
  },
  status: {
    type: String
  },
  statusLang: {
    type: String
  }

});


module.exports = mongoose.model('Measures', measureSchema);


//const collectionName = "measure";

//const Model = mongoose.model('measure', measureSchema);


