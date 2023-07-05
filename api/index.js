const server = require("./src/app.js")

require('dotenv').config();

server.listen(3001, console.log("Server is Runing in port 3001"))

// const io = require("socket.io")(app, {
//     cors: { origin: '*' }
// })

// let messages = []

// io.on('connection', socket => {
//     socket.on('chat_message', data => {

//         messages.push(data)
//         io.emit('chat_message', messages)
//     })

// })
