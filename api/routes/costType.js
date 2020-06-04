const express = require('express');
const router = express.Router();
const CostType = require("../models/costType");
const CostTypeGroup = require("../models/costTypeGroup");
const Customer = require("../models/customer");
var ObjectId = require('mongodb').ObjectID;

// Gets all the cost types
router.get('/', async (req, res) => {
  //res.send('it works');
  let customerId = req.query.customer
  let objId = new ObjectId(req.query.customer);
  console.log(objId)
  try {
    const costType = await CostType.find({ customerId: objId })
    res.json(costType)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creates new cost types in the database
router.post('/', async (req, res) => {
  const costType = new CostType({
    customer: req.body.customer,
    costTypeGroup: req.body.costTypeGroup,
    costType: req.body.costType,
    costTypeYear: req.body.costTypeYear,
    amount: req.body.amount,
    description: req.body.description
  });

  //compare cost type group name from costTypeGroup and costType collections and assign corresponding costTypeGroupId
  const costTypeGroup = await CostTypeGroup.findOne({ costTypeGroup: req.body.costTypeGroup });
  console.log(costTypeGroup);
  if (costType.costTypeGroup == costTypeGroup.costTypeGroup) {
    costType.costTypeGroupId = costTypeGroup._id;
  }

  //compare customer name from customer and costType collections and assign corresponding customerId
  const customer = await Customer.findOne({ customer: req.body.customer });
  console.log(customer);
  if (costType.customer == customer.customer) {
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
router.put('/:customerId/:costTypeYear/:costType', async (req, res) => {
  // let customerId = req.query.customer
  // let costTypeYear = req.query.costtypeyear
  // let costType = req.query.costType
  // let customer = new ObjectId(req.params.customer);

  try {
    const updatedCostType = await CostType.findOneAndUpdate(
      { customerId: req.params.customerId, costTypeYear: req.params.costTypeYear, costType: req.params.costType },
      {
        $set: {
          customer: req.body.customer, costTypeGroup: req.body.costTypeGroup, costType: req.body.costType, costTypeYear: req.body.costTypeYear, amount: req.body.amount,
          description: req.body.description
        }
      }
    )
    await updatedCostType.save();
    res.json(updatedCostType)

  } catch (err) {
    res.json({ message: err });
  }
});


// Delete cost type based on cost type
router.delete('/:customerId/:costType', async (req, res) => {
  try {
    const removedCostType = await CostType.deleteOne({ customerId: req.params.customerId, costType: req.params.costType })
    res.json(removedCostType)
  } catch (err) {
    res.json({ message: err })
  }

});


module.exports = router;