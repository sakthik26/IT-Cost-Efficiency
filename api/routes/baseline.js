const express = require('express');
const router = express.Router();
const Baseline = require("../models/baseline");
const Customer = require("../models/customer");
const CostType = require("../models/costType");


// Gets all the baselines
router.get('/', async (req, res) => {
  //res.send('it works');
    try {
       const baseline = await Baseline.find()
       res.json(baseline)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Creates new baseline in the database
router.post('/', async (req, res) => {
    const baseline  = new Baseline({
      customer: req.body.customer,
      costType: req.body.costType,
      totalCost: req.body.totalCost,
      year: req.body.year,
      description: req.body.description
    });


//compare costType from costType and baseline collections and assign corresponding costTypeId
 const costType = await CostType.findOne({ costType: req.body.costType });
 console.log(costType);
 if(baseline.costType == costType.costType)
 {
   baseline.costTypeId = costType._id;
 }

 //compare customer name from customer and baseline collections and assign corresponding customerId
 const customer = await Customer.findOne({ customer: req.body.customer });
 console.log(customer);
 if(baseline.customer == customer.customer)
 {
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


  module.exports = router;