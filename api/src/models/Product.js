const mongoose = require('mongoose');
const { Schema } = mongoose;


const ProductSchema = new Schema({
    id_edit: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
    },
    image: [
        {
            type: String,
        }
    ],
    imageName: [
        {
            type: String,
        }
    ],
    price: {
        type: Number,
    },
    discount: {
        type: Number,
        default: 0
    },
    oferta: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    },
    talleAndStock: [
        {
            talle: String,
            listado: [
                {
                    color: String,
                    stock: Number
                }
            ]
        }
    ],
    sold: {
        type: Number,
        default: 0
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    show: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('Product', ProductSchema)