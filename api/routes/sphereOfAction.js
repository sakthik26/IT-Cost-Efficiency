const express = require('express');
const router = express.Router();
const SphereOfAction = require("../models/sphereOfAction");


// Gets all the sphereOfAction
router.get('/', async (req, res) => {
  try {
    const soa = await SphereOfAction.find()
    res.json(soa)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});



// Creates new sphereOfAction in the database
router.post('/', async (req, res) => {

    const soa  = new SphereOfAction({
      sphereofaction: req.body.sphereofaction,
      description: req.body.description
    });

    soa.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });


  
  module.exports = router;