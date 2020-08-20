const express = require('express');
const router = express.Router();
const Measure = require('../models/measure');
const auth = require("../middleware/auth");
const Customer = require("../models/customer");
const UserRight = require("../models/userRight");
const Measures = require("../models/measure");
var ObjectId = require('mongodb').ObjectID;
// Get all subscribers
router.get('/', auth, async (req, res) => {
  //res.send('it works')
  let userId = req.query.id
  let customerId = req.query.customer

  if (userId) {
    UserRight.find({ userId: userId }).populate('userId').exec(function (err, user) {
      if (err) throw err;
      else {
        if (!user[0]) {
          return
        }

        let objId = new ObjectId(req.query.customer);

        var customerId = user[0].customerId
        for (var i = 0; i < user.length; i++) {
          if (user[i].customerId.equals(objId)) {


            customerId = user[i].customerId
            break;
          }
        }
        // let customerId = user[0].customerId

        Measures.find({ customerId: customerId }).populate('customerId').exec(function (err, measures) {
          if (err) throw err;
          else
            res.json(measures)
        });
      }
    })
    // try {
    //   const measures = await Measure.find()

    // } catch (err) {
    //   res.status(500).json({ message: err.message })
    // }
  }
  else {
    res.status(500).json({ message: err.message })
  }
})



// Get one subscriber
//router.get('/:id', async (req, res) => {
//})

// Create one subscriber
router.post('/', auth, async (req, res) => {

  let customer = await Customer.findOne({ _id: new ObjectId(req.body.customerId) });
  console.log(customer)
  const measure = new Measure({
    measureId: req.body.measureId,
    customerId: customer,
    externalMeasureId: req.body.externalMeasureId,
    measure: req.body.measure,
    description: req.body.description,
    potential: req.body.potential,
    durationInMonth: req.body.durationInMonth,
    status: req.body.status,
    statusLang: req.body.statusLang
  });

  /* try {
     const newMeasure = await measure.save()
     res.status(201).json(newMeasure)
   } catch (err) {
     res.status(400).json({ message: err.message })
   } */
  measure.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});
// Update all fields of a measure based on id
router.put('/:measureId', async (req, res) => {
  try {
    const updatedMeasure = await Measure.findOneAndUpdate(
      { measureId: req.params.measureId },
      {
        $set: {
          measureId: req.body.measureId, customerId: req.body.customerId, externalMeasureId: req.body.externalMeasureId,
          measure: req.body.measure, description: req.body.description, potential: req.body.potential, durationInMonth: req.body.durationInMonth,
          status: req.body.status, statusLang: req.body.statusLang
        }
      }
    )
    res.json(updatedMeasure)
  } catch (err) {
    res.json({ message: err });
  }
});


// Delete measure based on id 
router.delete('/:measureId', async (req, res) => {
  try {
    const removedMeasure = await Measure.remove({ measureId: req.params.measureId })
    res.json(removedMeasure)
  } catch (err) {
    res.json({ message: err })
  }

});

module.exports = router;