const mongoose = require('mongoose');

const costTypeSchema = new mongoose.Schema({
  customerId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  customer:
  {
    type: String
  },
  costTypeGroupId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'costTypeGroup'
  },
  costTypeGroup:
  {
    type: String
  },
  costType:
  {
    type: String
  },
  type:
  {
    type: String
  },
  costTypeYear:
  [{
      year: Number,
      amount: Number,
      _id: false
  }],
  description: {
    type: String

  }



});


module.exports = mongoose.model('CostType', costTypeSchema);