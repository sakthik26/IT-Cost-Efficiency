const express = require('express');
const router = express.Router();
const Baseline = require("../models/baseline");
const Customer = require("../models/customer");
var ObjectId = require('mongodb').ObjectID;

// Gets all the baselines
router.get('/', async (req, res) => {
  let customerId = req.query.customer
  let objId = new ObjectId(req.query.customer);
  console.log(objId)
  try {
    const baseline = await Baseline.find({ customerId: objId })
    res.json(baseline)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creates new baseline in the database
router.post('/', async (req, res) => {
  const baseline = new Baseline({
    customer: req.body.customer,
    totalCost: req.body.totalCost,
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
});

// Update baseline based on customer name
router.put('/:customer', async (req, res) => {
  try {
    const updatedBaseline = await Baseline.findOneAndUpdate(
      { customer: req.params.customer },
      {
        $set: {
          customer: req.body.customer, totalCost: req.body.totalCost, year: req.body.year,
          description: req.body.description
        }
      }
    )

    //compare customer name from customer and baseline collections and assign corresponding customerId
    const customer = await Customer.findOne({ customer: req.body.customer });
    console.log(customer);
    if (updatedBaseline.customer == customer.customer) {
      updatedBaseline.customerId = customer._id;
    }

    await updatedBaseline.save();
    res.json(updatedBaseline)

  } catch (err) {
    res.json({ message: err });
  }
});


module.exports = router;