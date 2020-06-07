const express = require('express');
const router = express.Router();
const CostType = require("../models/costType");
const CostTypeGroup = require("../models/costTypeGroup");
const Customer = require("../models/customer");


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
      customer: req.body.customer,
      costTypeGroup: req.body.costTypeGroup,
      costType: req.body.costType,
      costTypeYear: req.body.costTypeYear,
      description: req.body.description
    });

//compare cost type group name from costTypeGroup and costType collections and assign corresponding costTypeGroupId
const costTypeGroup = await CostTypeGroup.findOne({ costTypeGroup: req.body.costTypeGroup });
console.log(costTypeGroup);
if(costType.costTypeGroup == costTypeGroup.costTypeGroup)
{
  costType.costTypeGroupId = costTypeGroup._id;
}

//compare customer name from customer and costType collections and assign corresponding customerId
const customer = await Customer.findOne({ customer: req.body.customer });
console.log(customer);
if(costType.customer == customer.customer)
{
  costType.customerId = customer._id;
}  
  
    costType.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });


  // Update costType based on customer name
  router.put('/:customer', async (req, res) => {
    var objForUpdate = {};
    if (req.body.customer) objForUpdate.customer = req.body.customer; 
    if (req.body.costTypeGroup) objForUpdate.costTypeGroup = req.body.costTypeGroup; 
    if (req.body.costType) objForUpdate.costType = req.body.costType;
    if (req.body.costTypeYear) objForUpdate.costTypeYear = req.body.costTypeYear; 
    if (req.body.description) objForUpdate.description = req.body.description;

    const tmp = await CostType.find({ customer: req.body.customer})
    console.log(tmp);
    for(i=0; req.body.costTypeYear &&  i < req.body.costTypeYear.length; i++)
    {
      console.log(tmp)
    }

    try {
     const updatedCostType = await CostType.findOneAndUpdate(
        { customer: req.params.customer },
        {
          $set: objForUpdate
        }
      )
      await updatedCostType.save();
      res.json(updatedCostType)
      
    } catch (err) {
      res.json({ message: err });
    }
  });


// Delete cost type based on cost type
router.delete('/:customer/:costTypeYear/:costType', async (req, res) => {
  try {
    const removedCostType = await CostType.deleteOne({ customer: req.params.customer, costTypeYear: req.params.costTypeYear, costType: req.params.costType })
    res.json(removedCostType)
  } catch (err) {
    res.json({ message: err })
  }

});


  module.exports = router;