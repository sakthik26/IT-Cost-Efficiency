const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema({
  measureId: {
    type: String,
    required: true
  },
  customerId: {
    type: String,
    required: true
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


module.exports = mongoose.model('measure', measureSchema);


//const collectionName = "measure";

//const Model = mongoose.model('measure', measureSchema);


