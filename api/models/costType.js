const mongoose = require('mongoose');

const costTypeSchema = new mongoose.Schema({
  costTypeGroupId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'costTypeGroup'
  },
  costType:
  {
    type: String
  },
  description: {
    type: String

  }

});


module.exports = mongoose.model('CostType', costTypeSchema);