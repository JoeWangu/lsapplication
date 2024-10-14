const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to create a customer
router.post('/', customerController.createCustomer);

// Route to get all customers
router.get('/', customerController.getAllCustomers);

// Route to get a single customer by ID
router.get('/:id', customerController.getCustomerById);

// Route to update a customer
router.put('/:id', customerController.updateCustomer);

// Route to delete a customer
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
