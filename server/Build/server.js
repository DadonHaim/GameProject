const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socket = require("socket.io");
const User = require("./Entities/user");
app.use(require('cors')());
const server = http.createServer(app);
const user = new User({ username: "'Haim'", password: "123123" });
function main() { console.log("2:", user.getId()); }
user.on("load", main);
app.listen(3001);
//# sourceMappingURL=server.js.map