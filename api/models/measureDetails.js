const mongoose = require('mongoose');

const measureDetailsSchema = new mongoose.Schema({
  measure: {
    type: String
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'
  },
  customer: {
    type: String
  },
  currency: {
    type: String
  },
  description: {
    type: String
  },
  lever: {
    type: String
  },
  area: {
    type: String
  },
  currentHGValue: {
    type: String
  },
  sustainable: {
    type: Boolean
  },
  validFrom: {
    type: Date
  },
  validTo: {
    type: Date
  },
  HD0: {
    type: Date
  },
  HD1: {
    type: Date
  },
  HD2: {
    type: Date
  },
  HD3: {
    type: Date
  },
  HD4: {
    type: Date
  },
  HD5: {
    type: Date
  },
  additionalCharges: {
    type: String
  },
  savingsPotential: [{
    HD0: Number,
    HD1: Number,
    HD2: Number,
    HD3: Number,
    HD4: Number,
    HD5: Number,
    _id: false
  }],
  overruns: [{
    HD0: Number,
    HD1: Number,
    HD2: Number,
    HD3: Number,
    HD4: Number,
    HD5: Number,
    _id: false
  }]
});


module.exports = mongoose.model('MeasureDetails', measureDetailsSchema);