const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  customer: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  contact: {
    type: String,

  },
  address: {
    type: String,

  },
  project: {
    type: String,

  }

});


module.exports = mongoose.model('Customer', customerSchema);