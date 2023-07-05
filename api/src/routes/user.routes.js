const { Router } = require('express');
const { loginUser, createUser, getUser, updateUser, updateCart, updatePassword } = require('../controllers/user.controllers');

const verifyToken = require('./verifyToken')


const router = Router();


router.post('/signin', loginUser);

router.post('/signup', createUser);

router.get('/getuser/:id', verifyToken, getUser);

router.patch('/update', verifyToken, updateUser);

router.patch('/updatepassword', verifyToken, updatePassword);

router.patch('/updatecart', verifyToken, updateCart);

// router.patch('/deletecart', verifyToken, deleteCart);



module.exports = router;