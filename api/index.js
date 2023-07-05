const server = require("./src/app.js")

require('dotenv').config();

server.listen(3001, console.log("Server is Runing in port 3001"))

