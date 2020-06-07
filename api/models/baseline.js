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
  year:
  {
    totalCost: Number,
    year: Number
  },
  description: {
    type: String
  }

});


module.exports = mongoose.model('Baseline', baselineSchema);