"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region Libs  
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socket = require("socket.io");
const cors = require("cors");
//#endregion
//#region modules
const user_1 = __importDefault(require("./Entities/user"));
//#endregion
//#region settings - server
const server = http.createServer(app);
app.listen(3001);
//#endregion
//#region middlesWares  
app.use(cors());
//#endregion
const user = new user_1.default({ username: "Haim", password: "1233123" });
if (user.IsExist()) {
    console.log(200);
}
else
    console.log("00");
//# sourceMappingURL=server.js.map