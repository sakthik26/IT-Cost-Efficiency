const express = require('express');
const router = express.Router();
const CostTypeGroup = require("../models/costTypeGroup");


// Gets all the cost type groups
router.get('/', async (req, res) => {
  //res.send('it works');
    try {
       const costTypeGroup = await CostTypeGroup.find()
       res.json(costTypeGroup)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
})

// Creates new cost type groups in the database
router.post('/', (req, res) => {
    const costTypeGroup  = new CostTypeGroup({
      costTypeGroup: req.body.costTypeGroup,
      description: req.body.description
    });
  
    costTypeGroup.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });



  module.exports = router;