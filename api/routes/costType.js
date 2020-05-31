const express = require('express');
const router = express.Router();
const CostType = require("../models/costType");
const CostTypeGroup = require("../models/costTypeGroup");


// Gets all the cost types
router.get('/', async (req, res) => {
  //res.send('it works');
    try {
       const costType = await CostType.find()
       res.json(costType)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Creates new cost types in the database
router.post('/', async (req, res) => {
    const costType  = new CostType({
      costTypeGroup: req.body.costTypeGroup,
      costType: req.body.costType,
      costType_year: req.body.costType_year,
      amount: req.body.amount,
      description: req.body.description
    });

//compare cost type group name from costTypeGroup and costType collections and assign corresponding costTypeGroupId
const costTypeGroup = await CostTypeGroup.findOne({ costTypeGroup: req.body.costTypeGroup });
console.log(costTypeGroup);
if(costType.costTypeGroup == costTypeGroup.costTypeGroup)
{
  costType.costTypeGroupId = costTypeGroup._id;
}
  
  
    costType.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });



  module.exports = router;