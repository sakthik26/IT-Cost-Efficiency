
const express = require('express');
const router = express.Router();
const SavingsTarget = require("../models/savingsTarget");
const Customer = require("../models/customer");
var ObjectId = require('mongodb').ObjectID;


// Gets all the savings target
router.get('/', async (req, res) => {
  try {
    const savings = await SavingsTarget.find()
    res.json(savings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creates new savings target in the database
/*router.post('/', async (req, res) => {
  const savings = new SavingsTarget({
    customer: req.body.customer,
    year: req.body.year,
    description: req.body.description
  });


  //compare customer name from customer and savings target collections and assign corresponding customerId
  const customer = await Customer.findOne({ customer: req.body.customer });
  console.log(customer);
  if (savings.customer == customer.customer) {
    savings.customerId = customer._id;
  }

  savings.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});*/

// Update savings target based on customerId
router.put('/', async (req, res) => {
  var objForUpdate = {};
  let customerId = req.query.customer;
  let objId = new ObjectId(req.query.customer);
  let newYear = req.body.year;
  console.log('customer here' + objId)
  if (req.body.customer) objForUpdate.customer = req.body.customer;
  if (req.body.description) objForUpdate.description = req.body.description;

  const oldSavingsTargetData = await SavingsTarget.findOne({ customerId: objId })
  console.log('old-savingsyear-' + oldSavingsTargetData);
  var isNewObj = false
  if(newYear!=null) {
  for (var i = 0; i < newYear.length; i++) {
    isNewObj = false
    for (var j = 0; j < oldSavingsTargetData.year.length; j++) {
      if (oldSavingsTargetData.year[j].year == newYear[i].year) {
        oldSavingsTargetData.year[j].totalCost= parseInt(newYear[i].totalCost)
        isNewObj = true
      }
    }
  }
}
  objForUpdate.year = oldSavingsTargetData.year;

  try {
    const updatedSavingsTarget = await SavingsTarget.findOneAndUpdate(
      { customerId: objId },
      {
        $set: objForUpdate
      }
    )


    await updatedSavingsTarget.save();
    res.json(updatedSavingsTarget)

  } catch (err) {
    res.json({ message: err });
  }
});


module.exports = router;