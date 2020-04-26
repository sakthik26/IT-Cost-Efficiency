const mongoose = require('mongoose');
const Customer = require('./customer');
const User = require('./user.model');
const userRightSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  permission: {
    type: String,
  },
  permission_level: {
    type: String,
  }
});


module.exports = mongoose.model('UserRight', userRightSchema);