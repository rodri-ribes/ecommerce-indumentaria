const { MongoClient, ServerApiVersion } = require('mongodb');
const { mongoose } = require('mongoose');
require('dotenv').config();

const { MONGO_URL } = process.env;

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to mongodbAtlas"))
    .catch(err => console.log(err))

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () =>
    console.log("Connected successfully")
);


module.exports = db