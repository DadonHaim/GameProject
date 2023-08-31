
//#region Libs  
    const express = require("express");
    const app = express();
    const http = require("http");
    const path = require("path");
    const socket = require("socket.io");
    const cors = require("cors");

//#endregion

//#region modules
    import User from "./Entities/user"
    import Debug from "./Dev/debug"
//#endregion

//#region settings - server
    const server = http.createServer(app)
    app.listen(3001);  
//#endregion

//#region middlesWares  
    app.use(cors())

//#endregion



const user = new User({username:"Haim",password:"1233123"});

if(user.IsExist()){
    console.log(200)
    
}
else
console.log("00")
 
  