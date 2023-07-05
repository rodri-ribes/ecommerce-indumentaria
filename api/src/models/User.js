const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    image: {
        type: String,
        default: ``
    },
    imageName: {
        type: String,
        default: ``
    },
    email: {
        type: String,
        required: true
    },
    domicilio: {
        direccion: {
            type: String,
        },
        localidad: {
            type: String,
        },
        provincia: {
            type: String,
        },
        codigo_postal: {
            type: Number
        }
    },
    whatsapp: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
    }],
    shopping: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    ban: {
        type: Boolean,
        default: false,
    },
    rol: {
        type: String,
        default: "user",
    },
})

module.exports = mongoose.model('User', UserSchema)