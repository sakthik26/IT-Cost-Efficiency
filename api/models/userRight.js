const mongoose = require('mongoose');

const userRightSchema = new mongoose.Schema({
    userRightsId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    customerId: {
      type: String,
      required: true
    },
    permission: {
      type: String,
      required: true
    },
    permission_level: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('userRight', userRightSchema);