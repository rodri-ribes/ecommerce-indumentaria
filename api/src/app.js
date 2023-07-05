const express = require("express")
const { urlencoded } = require("express");
const morgan = require("morgan")
const routes = require("./routes/index.js")
const db = require('./database/db.js');
const cors = require("cors")
require('dotenv').config();

const server = express();




server.use(urlencoded({ extended: false }))
server.use(morgan('dev'));
server.use(express.json());
server.use(cors())

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})




server.use('/', routes);

module.exports = server