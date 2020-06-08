const express = require('express');
const router = express.Router();
const Lever = require("../models/lever");
const SphereOfAction = require("../models/sphereOfAction");



// Gets all the sphereOfAction
router.get('/', async (req, res) => {
  try {
    const levers = await Lever.find()
    res.json(levers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});



// Creates new sphereOfAction in the database
router.post('/', async (req, res) => {

    const levers  = new Lever({
      lever: req.body.lever,
      description: req.body.description,
      impact: req.body.impact,
      effort: req.body.effort,
      sourcing: req.body.sourcing
    });

     //compare sphereOfAction name from lever and sphereOfAction collections and assign corresponding sphereId
     const soa = await SphereOfAction.findOne({ sphereOfAction: req.body.sphereOfAction });
     if(levers.sphereOfAction == soa.sphereOfAction)
     {
         levers.sphereId = soa._id;
     }  


    levers.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });


  
  module.exports = router;