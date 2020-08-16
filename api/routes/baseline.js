
const express = require('express');
const router = express.Router();
const Baseline = require("../models/baseline");
const Customer = require("../models/customer");


// Gets all the baselines
router.get('/', async (req, res) => {
  try {
    const baseline = await Baseline.find()
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

// Update baseline based on customer name
router.put('/:customerId', async (req, res) => {
  var objForUpdate = {};
  if (req.body.customer) objForUpdate.customer = req.body.customer;
  if (req.body.year) objForUpdate.year = req.body.year;
  if (req.body.description) objForUpdate.description = req.body.description;

  try {
    const updatedBaseline = await Baseline.findOneAndUpdate(
      { customerId: req.params.customerId },
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