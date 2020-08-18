const express = require('express');
const router = express.Router();
const SavingsTarget = require("../models/savingsTarget");
const Customer = require("../models/customer");
var ObjectId = require('mongodb').ObjectID;

// Gets all the savings target
router.get('/', async (req, res) => {
  let customerId = req.query.customer;
  let objId = new ObjectId(req.query.customer);
  try {
    const savings = await SavingsTarget.find({ customerId: objId })
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

// Update savings target based on customer name
router.put('/:customerId', async (req, res) => {
  var objForUpdate = {};
  if (req.body.customer) objForUpdate.customer = req.body.customer;
  if (req.body.year) objForUpdate.year = req.body.year;
  if (req.body.description) objForUpdate.description = req.body.description;

  try {
    const updatedSavingsTarget = await SavingsTarget.findOneAndUpdate(
      { customerId: req.params.customerId },
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