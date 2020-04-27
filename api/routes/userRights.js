const express = require('express');
const router = express.Router();
const UserRight = require('../models/userRight');
const { User } = require("../models/user.model");
const Customer   = require("../models/customer");


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
router.post('/', async (req, res) => {

  const userrights = new UserRight({
    userId: req.body.userId,
    customerId: req.body.customerId,
    customer: req.body.customer,
    email: req.body.email,
    permission: req.body.permission,
    permission_level: req.body.permission_level
  });

  //compare userId from user Collection and assign it in userRights
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if(userrights.email == user.email)
  {
    userrights.userId = user._id;
  }

  //compare customer name from customer collection and assign it in customer
  const customer = await Customer.findOne({ customer: req.body.customer });
  console.log(customer);
  if(userrights.customer == customer.customer)
  {
    userrights.customerId = customer._id;
  }

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