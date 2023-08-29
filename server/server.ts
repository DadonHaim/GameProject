
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socket = require("socket.io");
const User = require("./Entities/user");

app.use(require('cors')())

const server = http.createServer(app)





app.listen(3001);  