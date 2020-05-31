const mongoose = require('mongoose');

const costTypeSchema = new mongoose.Schema({
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
  costType_year:
  {
    type: Number
  },
  amount:
  {
    type: Number
  },
  description: {
    type: String

  }

});


module.exports = mongoose.model('CostType', costTypeSchema);