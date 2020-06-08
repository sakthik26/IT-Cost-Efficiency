const mongoose = require('mongoose');

const sphereOfActionSchema = new mongoose.Schema({
  sphereOfAction:
  {
    type: String
    
  },
  description: 
  {
    type: String
  }
});


module.exports = mongoose.model('SphereOfAction', sphereOfActionSchema);