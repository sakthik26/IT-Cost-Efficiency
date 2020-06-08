const express = require('express');
const router = express.Router();
const TargetPoints = require("../models/targetPoints");
const Levers = require("../models/lever");
const CostType = require("../models/costType");


// Gets all the targetpoints
router.get('/', async (req, res) => {
  try {
    const targetpts = await TargetPoints.find()
    res.json(targetpts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});



// Creates new targetpoint in the database
router.post('/', async (req, res) => {

    const targetpts  = new TargetPoints({
      targetPoint: req.body.targetPoint,
      lever: req.body.lever,
      costType: req.body.costType,
      description: req.body.description,
      benchmSavingpotCostType: req.body.benchmSavingpotCostType
    });

     //compare lever name from levers and targetPoint collections and assign corresponding leverId
     const lvrs = await Levers.findOne({ lever: req.body.lever });
     if(targetpts.lever == lvrs.lever)
     {
         targetpts.measureId = lvrs._id;
     }  
  
      //compare costtype name from costType and targetPoint collections and assign corresponding costTypeId
    const costtypes = await CostType.findOne({ costType: req.body.costType });
    if(targetpts.costType == costtypes.costType)
    {
        targetpts.costTypeId = costtypes._id;
    }  
  
    targetpts.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });


  
  module.exports = router;