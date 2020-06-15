
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



module.exports = router;