const express = require('express');
const router = express.Router();
const CostType = require("../models/costType");


// Gets all the cost types
router.get('/', async (req, res) => {
  //res.send('it works');
    try {
       const costType = await CostType.find()
       res.json(costType)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Creates new cost types in the database
router.post('/', (req, res) => {
    const costType  = new CostType({
      costTypeGroupId: req.body.costTypeGroupId,
      costType: req.body.costType,
      description: req.body.description
    });
  
    costType.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });



  module.exports = router;