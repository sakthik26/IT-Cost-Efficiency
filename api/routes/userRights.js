const express = require('express');
const router = express.Router();
const UserRight = require('../models/userRight');


// Gets all the userrights
router.get('/', async (req, res) => {
  try {
    const userrights = await UserRight.find()
    res.json(userrights)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creates new user rights in the database
router.post('/', (req, res) => {

  const userrights = new UserRight({
    userRightsId: req.body.userRightsId,
    userId: req.body.userId,
    customerId: req.body.customerId,
    permission: req.body.permission,
    permission_level: req.body.permission_level
  });

  /* try {
     const newMeasure = await measure.save()
     res.status(201).json(newMeasure)
   } catch (err) {
     res.status(400).json({ message: err.message })
   } */
  userrights.save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json({ message: err });
    });
});


// Delete user right based on id 
router.delete('/:userRightsId', async (req, res) => {
  try {
    const removedUserRight = await Customer.remove({ userRightsId: req.params.userRightsId })
    res.json(removedUserRight)
  } catch (err) {
    res.json({ message: err })
  }

});






module.exports = router;