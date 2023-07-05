const { Router } = require('express');
const { createComment, updateComment, deleteComment, responseComment, deleteResponse } = require('../controllers/comment.controller.js');
const verifyToken = require('./verifyToken.js');

const router = Router();

router.post('/add', verifyToken, createComment);

router.patch('/update', verifyToken, updateComment);

router.delete('/delete/:id/:id_product', verifyToken, deleteComment);

router.patch('/response', verifyToken, responseComment);

router.delete('/response/delete/:id', verifyToken, deleteResponse);

module.exports = router
