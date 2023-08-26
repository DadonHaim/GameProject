
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socket = require("socket.io");

app.use(require('cors')())

const server = http.createServer(app)

const io = new socket.Server()


io.on('connection', (socket) => {
    console.log('a user connected');
});


app.listen(3001);  