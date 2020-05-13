const mongoose = require('mongoose');

const baselineSchema = new mongoose.Schema({
  customerId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  description: {
    type: String

  }

});


module.exports = mongoose.model('Baseline', baselineSchema);