const mongoose = require('mongoose');

const costTypeGroupSchema = new mongoose.Schema({
  costTypeGroup:
  {
    type: String
  },
  description: {
    type: String

  }

});


module.exports = mongoose.model('CostTypeGroup', costTypeGroupSchema);