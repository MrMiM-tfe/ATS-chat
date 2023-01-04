// Pakages
const express = require('express')
const http = require("http")
const mongoose = require('mongoose')
const { Server } = require("socket.io");
const cors = require("cors")
const {PeerServer} = require("peer")

// Configs
const config = require('./config/config')

// socket namespaces
const Namespaces = require('./namespaces')

// Routes
const routes = require("./routes")

// create APP
const app = express()

// Implement CORS
app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// setup server base on express
const server = http.createServer(app)

// setup peer server
const peerServer = PeerServer({
    proxied: true,
    port: 3300,
    debug: true,
    ssl:{}
})

// setup socket server
const io = new Server(server, {
    cors: {
        origin: function (req, callback) {
            callback(null, req)
        },
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

// io namespaces
Namespaces(io)

// Routes
app.use("/api", routes)

// start server
mongoose.connect(config.db.url).then((result) => {
    server.listen(config.server.port)
    console.log(`Server is listening  on port ${config.server.port}`);
})

peerServer.on("connection", client => {
    console.log("peer connected" , client.getId());
})