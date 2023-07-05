const express = require("express");
const router = express.Router();

const PaymentController = require("../controllers/PaymentController");
const PaymentService = require("../services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());


router.post("/", function (req, res) {
    PaymentInstance.getPaymentLink(req, res);
});


module.exports = router;
