const express = require('express');
const router = express.Router();
const Customer = require("../models/customer");
const UserRights = require("../models/userRight")


// Gets all the customers
router.get('/', async (req, res) => {
  //res.send('it works');
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creates new customers in the database
router.post('/', (req, res) => {

    const customer  = new Customer({
      customerId: req.body.customerId,
      customer: req.body.customer,
      department: req.body.department,
      contact: req.body.contact,
      address: req.body.address,
      project: req.body.project
    });
  
    customer.save()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json({ message: err });
      });
  });


// Update customers based on email
router.put('/:customer', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { customer: req.params.customer },
      {
        $set: {
          customer: req.body.customer, department: req.body.department, contact: req.body.contact,
          address: req.body.address, project: req.body.project
        }
      }
    )

   /*const userrights = await UserRights.findOne({ customerId: req.body.customerId });
   if(userrights.customerId == updatedCustomer._id)
    {
      userrights.customer = updatedCustomer.customer;
    }
    await userrights.save();*/
    await updatedCustomer.save();
    res.json(updatedCustomer)
    
  } catch (err) {
    res.json({ message: err });
  }
});
 

// Delete customer based on id 
router.delete('/:customer', async (req, res) => {
  try {
    const removedCustomer = await Customer.remove({ customer: req.params.customer })
    res.json(removedCustomer)
  } catch (err) {
    res.json({ message: err })
  }

});





module.exports = router;