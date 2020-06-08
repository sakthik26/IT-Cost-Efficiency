const mongoose = require('mongoose');

const targetPointsSchema = new mongoose.Schema({
  targetPoint:
  {
    type: String
    
  },
  leverId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lever'
  },
  lever:
  {
    type: String
  },
  costTypeId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CostType'
  },
  costType:
  {
    type: String
  },
  description:
  {
    type: String
  },
  benchmSavingpotCostType:   //unclear what this field does
  {
    type: String
  }
});


module.exports = mongoose.model('TargetPoints', targetPointsSchema);