const { Router } = require('express');
const { addCustomer, getCustomer, getCustomers, addMessage, addStatus, deleteCustomer } = require('../controllers/customer.controller.js');
const verifyToken = require('./verifyToken.js');

const router = Router();

router.post('/add', verifyToken, addCustomer);

router.get('/get', verifyToken, getCustomers);

router.get('/getuser/:id', verifyToken, getCustomer);

router.post('/addmessage', verifyToken, addMessage);

router.patch('/addstatus', verifyToken, addStatus);

router.delete('/delete/:id', verifyToken, deleteCustomer);

// router.patch('/delete/:id/:id_product', verifyToken,);

// router.patch('/response', verifyToken, );

// router.delete('/response/delete/:id', verifyToken, );

module.exports = router
