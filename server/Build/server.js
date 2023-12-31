"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
console.clear();
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var User_1 = __importDefault(require("@Entities/User/User"));
//#region settings - server
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
User_1.default.getAllUsers().then(function (data) {
    console.dir(data);
}).catch(function (err) {
    console.log(err);
});
server.listen(3001, function () {
    console.log("http://121.0.0.1:3001");
});
//# sourceMappingURL=server.js.map