const mongoose = require('mongoose');

const leverSchema = new mongoose.Schema({
  ldomainId:
  {
    type: mongoose.Types.Schema.ObjectId,
    ref: 'ldomain'
    
  },
  domain:
  {
    type: String
  },
  sphereId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sphereOfAction'
  },
  sphereOfAction:
  {
    type: String
  },
  lever:
  {
    type: String
  },
  description:
  {
    type: String
  },
  impact:   //unclear what this field does
  {
    type: String
  },
  effort:
  {
    type: String
  },
  sourcing:
  {
    type: String
  }
});


module.exports = mongoose.model('Lever', leverSchema);