const express = require('express');
const router = express.Router();
const CostType = require("../models/costType");
const CostTypeGroup = require("../models/costTypeGroup");
const Customer = require("../models/customer");
var ObjectId = require('mongodb').ObjectID;


// Gets all the cost types
router.get('/', async (req, res) => {
  let customerId = req.query.customer;
  let objId = new ObjectId(req.query.customer);
  let type = req.query.type;
  try {
    const costType = await CostType.find({ customerId: objId, type: type })
    res.json(costType)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creates new cost types in the database
router.post('/', async (req, res) => {
  let customerInfo = await Customer.findOne({ _id: new ObjectId(req.body.customerId) });

  customerInfo = customerInfo.customer
  console.log('customerName' + customerInfo)
  const costType = new CostType({
    customer: customerInfo,
    costTypeGroup: req.body.costTypeGroup,
    costType: req.body.costType,
    type: req.body.type,
    costTypeYear: req.body.costTypeYear,
    description: req.body.description,
    sphereOfAction: req.body.sphereOfAction
  });

  //compare cost type group name from costTypeGroup and costType collections and assign corresponding costTypeGroupId
  const costTypeGroup = await CostTypeGroup.findOne({ costTypeGroup: req.body.costTypeGroup });
  console.log(costTypeGroup);
  if (costType.costTypeGroup == costTypeGroup.costTypeGroup) {
    costType.costTypeGroupId = costTypeGroup._id;
  }

  //compare customer name from customer and costType collections and assign corresponding customerId
  const customer = await Customer.findOne({ customer: customerInfo });
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
router.put('/', async (req, res) => {
  var objForUpdate = {};
  let customerId = req.query.customer;
  let objId = new ObjectId(req.query.customer);
  let type = req.query.type
  let newCostTypeYear = req.body.costTypeYear
  console.log('customer here' + objId)
  // if (req.body.customer) objForUpdate.customer = req.body.customer;
  // if (req.body.costTypeGroup) objForUpdate.costTypeGroup = req.body.costTypeGroup;
  if (req.body.costType) objForUpdate.costType = req.body.costType;
  if (req.body.type) objForUpdate.type = req.body.type;
  if (req.body.sphereOfAction) objForUpdate.sphereOfAction = req.body.sphereOfAction;
  //if (req.body.costTypeYear) objForUpdate.costTypeYear = req.body.costTypeYear; 
  //if (req.body.description) objForUpdate.description = req.body.description;


  const oldCostTypeData = await CostType.findOne({ customerId: objId, costType: req.body.costType, type: type })
  //objForUpdate.costTypeYear = tmp.costTypeYear;
  console.log('old-costTypeYear-' + oldCostTypeData);
  var isNewObj = false
  for (var i = 0; i < newCostTypeYear.length; i++) {
    isNewObj = false
    for (var j = 0; j < oldCostTypeData.costTypeYear.length; j++) {
      if (oldCostTypeData.costTypeYear[j].year == newCostTypeYear[i].year) {
        oldCostTypeData.costTypeYear[j].amount = parseInt(newCostTypeYear[i].amount)
        isNewObj = true
      }
    }
    if (!isNewObj) {
      var newObject = {}
      newObject['year'] = newCostTypeYear[i].year
      newObject['amount'] = parseInt(newCostTypeYear[i].amount)
      oldCostTypeData.costTypeYear.push(newObject)
    }
  }
  objForUpdate.costTypeYear = oldCostTypeData.costTypeYear

  try {
    const updatedCostType = await CostType.findOneAndUpdate({ customerId: objId, costType: req.body.costType, type: type },
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
router.delete('/', async (req, res) => {
  let customerId = req.query.customer;
  let objId = new ObjectId(req.query.customer);
  let type = req.query.type
  let costType = req.query.costtype

  try {
    const removedCostType = await CostType.deleteOne({ customerId: objId, costType: costType, type: type })
    res.json(removedCostType)
  } catch (err) {
    res.json({ message: err })
  }

});


module.exports = router;