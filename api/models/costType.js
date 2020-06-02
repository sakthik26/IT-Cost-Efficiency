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
  costTypeYear:
  {
    type: Number
  },
  amount:
  {
    type: Number
  },
  description: {
    type: String

  },



});


module.exports = mongoose.model('CostType', costTypeSchema);