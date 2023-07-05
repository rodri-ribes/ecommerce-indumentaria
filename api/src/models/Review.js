const mongoose = require('mongoose');
const { Schema } = mongoose;


const ReviewSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    id_product: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('Review', ReviewSchema)