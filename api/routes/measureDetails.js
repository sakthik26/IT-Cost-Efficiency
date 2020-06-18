
const express = require('express');
const router = express.Router();
const MeasureDetails = require("../models/measureDetails");
const Measures = require("../models/measure");
const Customer = require("../models/customer");


// Gets all the client measures
router.get('/', async (req, res) => {
  try {
    const measuredetails = await MeasureDetails.find()
    res.json(measuredetails)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creates new client measures in the database
router.post('/', async (req, res) => {
  const postmeasuredetails = new MeasureDetails({
    measure: req.body.measure,
    customer: req.body.customer,
    currency: req.body.currency,
    description: req.body.description,
    lever: req.body.lever,
    area: req.body.area,
    currentHGValue: req.body.currentHGValue,
    sustainable: req.body.sustainable,
    validFrom: req.body.validFrom,
    validTo: req.body.validTo,
    HD0: req.body.HD0,
    HD1: req.body.HD1,
    HD2: req.body.HD2,
    HD3: req.body.HD3,
    HD4: req.body.HD4,
    HD5: req.body.HD5,
    additionalCharges: req.body.additionalCharges,
    savingsPotential: req.body.savingsPotential,
    overruns: req.body.overruns
  });


  //compare measure name from measures and measureDetails collections and assign corresponding measureId
  //const measures = await Measures.findOne({ measure: req.body.measure });
    //if (postmeasuredetails.measure == measures.measure) {
     //   postmeasuredetails.measureId = measures._id;
    //}

  //compare customer name from customers and measureDetails collections and assign corresponding customerId
  const customers = await Customer.findOne({ customer: req.body.customer });
  if (postmeasuredetails.customer == customers.customer) {
      postmeasuredetails.customerId = customers._id;
  }

  const postmeasure = new Measures({
    measureId: postmeasuredetails._id,
    measure: postmeasuredetails.measure,
    description: postmeasuredetails.description,
    customerId: postmeasuredetails.customerId,
    customer: postmeasuredetails.customer
  });
  
  postmeasuredetails.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });

    postmeasure.save()
    .then(data => {
    
    })
    .catch(err => {
      res.json({ message: err });
    });


});

// Update measure details based on measureid
router.put('/:_id', async (req, res) => {
    var objForUpdate = {};
    if (req.body.measure) objForUpdate.measure = req.body.measure;
    if (req.body.currency) objForUpdate.currency = req.body.currency;
    if (req.body.description) objForUpdate.description = req.body.description;
    if (req.body.lever) objForUpdate.lever = req.body.lever;
    if (req.body.area) objForUpdate.area = req.body.area;
    if (req.body.currentHGValue) objForUpdate.currentHGValue = req.body.currentHGValue;
    if (req.body.sustainable) objForUpdate.sustainable = req.body.sustainable;
    if (req.body.validFrom) objForUpdate.validFrom = req.body.validFrom;
    if (req.body.validTo) objForUpdate.validTo = req.body.validTo;
    if (req.body.HD0) objForUpdate.HD0 = req.body.HD0;
    if (req.body.HD1) objForUpdate.HD0 = req.body.HD1;
    if (req.body.HD2) objForUpdate.HD0 = req.body.HD2;
    if (req.body.HD3) objForUpdate.HD0 = req.body.HD3;
    if (req.body.HD4) objForUpdate.HD0 = req.body.HD4;
    if (req.body.HD5) objForUpdate.HD0 = req.body.HD5;
    if (req.body.additionalCharges) objForUpdate.additionalCharges = req.body.additionalCharges;
    if (req.body.savingsPotential) objForUpdate.savingsPotential = req.body.savingsPotential;
    if (req.body.overruns) objForUpdate.overruns = req.body.overruns;

  
    try {
      const updatedMeasureDetail = await MeasureDetails.findOneAndUpdate(
        { _id: req.params._id },
        {
          $set: objForUpdate
        }
      )

      const updatedMeasure = await Measures.findOneAndUpdate(
        { measureId: req.params._id },
        {
          $set: objForUpdate
        }
      )
      
      await updatedMeasureDetail.save();
      await updatedMeasure.save();
      res.json(updatedMeasureDetail)
  
    } catch (err) {
      res.json({ message: err });
    }
  });


    // Delete clientMeasure based on measureId
    router.delete('/:_id', async (req, res) => {
        try {
            const removedMeasureDetail = await MeasureDetails.remove({ _id: req.params._id })
            console.log(removedMeasureDetail)

            const removedMeasure = await Measures.remove({ measureId: req.params._id })
            
            res.json(removedMeasureDetail)
           
          } catch (err) {
            res.json({ message: err })
          }
        });
        



module.exports = router;