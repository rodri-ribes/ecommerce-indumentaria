const { Router } = require('express');
const { createReview, updateReview, deleteReview } = require('../controllers/review.controller.js');
const verifyToken = require('./verifyToken.js');

const router = Router();

router.post('/add', verifyToken, createReview);

router.patch('/update', verifyToken, updateReview);

router.delete('/delete/:id/:id_product', verifyToken, deleteReview);

module.exports = router
