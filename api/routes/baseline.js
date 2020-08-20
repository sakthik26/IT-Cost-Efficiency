const express = require('express');
const router = express.Router();
const Baseline = require("../models/baseline");
const Customer = require("../models/customer");
var ObjectId = require('mongodb').ObjectID;

// Gets all the baselines
router.get('/', async (req, res) => {
  let customerId = req.query.customer;
  let objId = new ObjectId(req.query.customer);
  try {
    const baseline = await Baseline.find({ customerId: objId })
    res.json(baseline)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creates new baseline in the database
/*router.post('/', async (req, res) => {
  const baseline = new Baseline({
    customer: req.body.customer,
    year: req.body.year,
    description: req.body.description
  });
  //compare customer name from customer and baseline collections and assign corresponding customerId
  const customer = await Customer.findOne({ customer: req.body.customer });
  console.log(customer);
  if (baseline.customer == customer.customer) {
    baseline.customerId = customer._id;
  }
  baseline.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});*/

// Update baseline based on customerId
router.put('/', async (req, res) => {
  var objForUpdate = {};
  let customerId = req.query.customer;
  let objId = new ObjectId(req.query.customer);
  let newYear = req.body.year;
  console.log('customer here' + objId)
  if (req.body.customer) objForUpdate.customer = req.body.customer;
  if (req.body.description) objForUpdate.description = req.body.description;


  const oldBaselineData = await Baseline.findOne({ customerId: objId })
  console.log('old-baselineyear-' + oldBaselineData);
  var isNewObj = false
  if (newYear != null) {
    for (var i = 0; i < newYear.length; i++) {
      isNewObj = false
      for (var j = 0; j < oldBaselineData.year.length; j++) {
        if (oldBaselineData.year[j].year == newYear[i].year) {
          oldBaselineData.year[j].totalCost = parseInt(newYear[i].totalCost)
          isNewObj = true
        }
      }
    }
  }
  objForUpdate.year = oldBaselineData.year;


  try {
    const updatedBaseline = await Baseline.findOneAndUpdate(
      { customerId: objId },
      {
        $set: objForUpdate
      }
    )


    await updatedBaseline.save();
    res.json(updatedBaseline)

  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;