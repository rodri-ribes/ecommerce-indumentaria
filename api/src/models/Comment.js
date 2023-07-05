const mongoose = require('mongoose');
const { Schema } = mongoose;


const CommentSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: String,
        require: true
    },
    comment: {
        type: String,
        require: true
    },
    id_product: {
        type: String
    },
    response: {
        firstname: {
            type: String,
        },
        date: {
            type: String,
        },
        comment: {
            type: String
        }
    }
})

module.exports = mongoose.model('Comment', CommentSchema)