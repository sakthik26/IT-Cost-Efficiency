const mongoose = require('mongoose');

const baselineSchema = new mongoose.Schema({
  customerId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  customer:
  {
    type:String
  },
  totalCost:
  {
    type: Number
  },
  year:
  {
    type: Number
  },
  description: {
    type: String
  }

});


module.exports = mongoose.model('Baseline', baselineSchema);