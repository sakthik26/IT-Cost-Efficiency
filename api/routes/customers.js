const express = require('express');
const router = express.Router();
const Customer = require("../models/customer");
const UserRights = require("../models/userRight");
const Baseline = require("../models/baseline");
const SavingsTarget = require("../models/savingsTarget");


// Gets all the customers
router.get('/', async (req, res) => {
  //res.send('it works');
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creates new customers in the database
router.post('/', (req, res) => {

  const customer = new Customer({
    customerId: req.body.customerId,
    customer: req.body.customer,
    department: req.body.department,
    contact: req.body.contact,
    address: req.body.address,
    project: req.body.project
  });


  customer.save()
    .then(data => {
      res.json(data);
    }
    )
    .catch(err => {
      res.json({ message: err });
    });

  const baseline = new Baseline({
    customer: req.body.customer,
    year: [{
      "totalCost": "",
      "year": 2020
    },
    {
      "totalCost": "",
      "year": 2021
    },
    {
      "totalCost": "",
      "year": 2022
    },
    {
      "totalCost": "",
      "year": 2023
    },
    {
      "totalCost": "",
      "year": 2024
    },
    {
      "totalCost": "",
      "year": 2025
    },
    {
      "totalCost": "",
      "year": 2026
    },
    {
      "totalCost": "",
      "year": 2027
    },
    {
      "totalCost": "",
      "year": 2028
    },
    {
      "totalCost": "",
      "year": 2029
    }],
    description: "",
    customerId: customer._id
  });

  baseline.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });

  const savings = new SavingsTarget({
    customer: req.body.customer,
    year: [{
      "totalCost": "",
      "year": 2020
    },
    {
      "totalCost": "",
      "year": 2021
    },
    {
      "totalCost": "",
      "year": 2022
    },
    {
      "totalCost": "",
      "year": 2023
    },
    {
      "totalCost": "",
      "year": 2024
    },
    {
      "totalCost": "",
      "year": 2025
    },
    {
      "totalCost": "",
      "year": 2026
    },
    {
      "totalCost": "",
      "year": 2027
    },
    {
      "totalCost": "",
      "year": 2028
    },
    {
      "totalCost": "",
      "year": 2029
    }],
    description: "",
    customerId: customer._id
  });

  savings.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });


});



// Update customers based on email
router.put('/:_id', async (req, res) => {
  var objForUpdate = {};
  if (req.body.customer) objForUpdate.customer = req.body.customer;
  if (req.body.department) objForUpdate.department = req.body.department;
  if (req.body.contact) objForUpdate.contact = req.body.contact;
  if (req.body.address) objForUpdate.address = req.body.address;
  if (req.body.project) objForUpdate.project = req.body.project;

  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: objForUpdate
      }
    )

    await updatedCustomer.save();
    res.json(updatedCustomer)

  } catch (err) {
    res.json({ message: err });
  }
});


// Delete customer based on id 
router.delete('/:customer', async (req, res) => {
  try {
    const removedCustomer = await Customer.remove({ customer: req.params.customer })
    res.json(removedCustomer)
  } catch (err) {
    res.json({ message: err })
  }

});





module.exports = router;
