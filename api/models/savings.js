const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
  measureId:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measures'
  },
  measure: 
  {
    type: String
  },
  totalCost:
  {
    type: Number
  },
  realized:
  {
    type: Number
  },
  savingPerYear: 
  {
    type: Number
  },
  impactDate:
  {
    type: Date
  },
  startingDate:
  {
    type: Date
  },
  finishDate: {
    type: Date
  }



});


module.exports = mongoose.model('Savings', savingsSchema);