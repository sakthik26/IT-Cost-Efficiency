const mongoose = require('mongoose');

const measureSchema = new mongoose.Schema({
  MEASURE_ID: {
    type: String,
    required: true
  },
  CUSTOMER_ID: {
    type: String,
    required: true
  },
  EXTERNALMEASURE_ID: {
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
  Status: {
    type: String,
    required: true
  },
  StatusLang: {
    type: String,
    required: true
  }
 
});


module.exports = mongoose.model('measure', measureSchema);


//const collectionName = "measure";

//const Model = mongoose.model('measure', measureSchema);

//const obj = new Model(req.body)

//Model.createCollection();
