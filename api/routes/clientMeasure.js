
const express = require('express');
const router = express.Router();
const ClientMeasure = require("../models/clientMeasure");
const Measures = require("../models/measure");



// Gets all the client measures
router.get('/', async (req, res) => {
  try {
    const clientMeasures = await ClientMeasure.find()
    res.json(clientMeasures)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


// Creates new client measures in the database
router.post('/', async (req, res) => {
  const postClientMeasures = new ClientMeasure({
    measure: req.body.measure,
    currency: req.body.currency,
    measureDescription: req.body.measureDescription,
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
    savingsPotential: req.body.savingsPotential,
    overruns: req.body.overruns
  });


  //compare measure name from measures and clientMeasures collections and assign corresponding measureId
  const measures = await Measures.findOne({ measure: req.body.measure });
    if (postClientMeasures.measure == measures.measure) {
        postClientMeasures.measureId = measures._id;
    }

  postClientMeasures.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });

});

// Update clientmeasures based on measureid
router.put('/:measureId', async (req, res) => {
    var objForUpdate = {};
    if (req.body.measure) objForUpdate.measure = req.body.measure;
    if (req.body.currency) objForUpdate.currency = req.body.currency;
    if (req.body.measureDescription) objForUpdate.measureDescription = req.body.measureDescription;
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
    if (req.body.savingsPotential) objForUpdate.savingsPotential = req.body.savingsPotential;
    if (req.body.overruns) objForUpdate.overruns = req.body.overruns;

  
    try {
      const updatedClientMeasure = await ClientMeasure.findOneAndUpdate(
        { measureId: req.params.measureId },
        {
          $set: objForUpdate
        }
      )
  
      await updatedClientMeasure.save();
      res.json(updatedClientMeasure)
  
    } catch (err) {
      res.json({ message: err });
    }
  });


    // Delete clientMeasure based on measureId
    router.delete('/:measureId', async (req, res) => {
        try {
            const removedClientMeasure = await ClientMeasure.remove({ measureId: req.params.measureId })
            res.json(removedClientMeasure)
          } catch (err) {
            res.json({ message: err })
          }
        });
        




module.exports = router;