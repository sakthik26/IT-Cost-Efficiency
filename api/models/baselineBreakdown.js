const mongoose = require('mongoose');

const baselineBreakdownSchema = new mongoose.Schema({
  baselineId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'baseline'
  },
  costTypeId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'costType'
  },
  amount: {
    type: Number

  }

});


module.exports = mongoose.model('BaselineBreakdown', baselineBreakdownSchema);