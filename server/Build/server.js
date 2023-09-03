"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//#region Libs  
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const io = require("socket.io");
const user_1 = __importDefault(require("./Entities/user"));
//#endregion
//#region settings - server
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const socket = io(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
//#endregion
//#region middlesWares  
app.use((REQ, RES, NEXT) => {
    RES.header("Access-Control-Allow-Origin", '*');
    RES.header("Access-Control-Allow-Headers", 'Origin, X-Requesed-With , Content-Type , Accept , Authorization');
    if (REQ.method === "OPTIONS") {
        RES.header("Access-Control-Allow-Method", 'PUT, POST, PATCH, DELETE, GET');
        return RES.status(200).json({});
    }
    NEXT();
});
//#endregion
let user = new user_1.default();
user.login({ username: "user2", password: "123123" });
console.log(user.getAvatars()[0].getInventory().GetAllItems());
server.listen(3001, () => {
    console.log("http://121.0.0.1:3001");
});
//# sourceMappingURL=server.js.map