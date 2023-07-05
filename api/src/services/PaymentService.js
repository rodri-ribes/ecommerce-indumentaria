const axios = require("axios");

class PaymentService {
    async createPayment(req, res) {
        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
            // payer: {
            //     email: "test_user_974738482@testuser.com"
            // },
            items: req.body.cart,
            back_urls: {
                failure: "https://mateek.vercel.app/afterpaying/failure",
                pending: "https://mateek.vercel.app/afterpaying/pending",
                success: "https://mateek.vercel.app/afterpaying/success"
            },
        };


        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                Authorization: `Bearer APP_USR-3096624136492303-081117-58ae3aa07ef218ba8fb24ab60f827c52-1177841588`
            }
        });
        return payment.data;
    }
}

module.exports = PaymentService;
