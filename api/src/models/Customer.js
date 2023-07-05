const mongoose = require('mongoose');
const { Schema } = mongoose;


const CustomerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    //no se uso ref Object _id porque se agrego nuevos atributos 
    products: [
        {
            title: {
                type: String,
            },
            content: {
                type: String
            },
            image: {
                type: String
            },
            id_edit: {
                type: String
            },
            id: {
                type: String
            },
            price: {
                type: Number
            },
            discount: {
                type: Number
            },
            category: {
                type: String
            },
            cant: {
                type: Number
            },
            color: {
                type: String
            },
            talle: {
                type: String
            },
        }
    ],
    paymentMethod: {
        type: String,
        required: true,
    },
    shippingWay: {
        type: String,
        require: true
    },
    date: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        text: {
            type: String,
        },
        style: {
            type: Boolean,
        }
    },
    chat: [
        {
            usuario: {
                type: String,
            },
            text: {
                type: String
            },
            date: {
                type: String
            },

        }
    ]
})

module.exports = mongoose.model('Customer', CustomerSchema)