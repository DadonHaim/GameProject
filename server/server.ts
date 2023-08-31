
//#region Libs  
    import express from 'express';
    import http from 'http';
    const io = require("socket.io")
    import { Socket } from 'socket.io';
    import User from './Entities/user';
    import  Game  from './Gloabl';
import { Login1 } from './sockets/loginSockts';
    
    //#endregion
 
    
    //#region settings - server
    const app = express();
    const server = http.createServer(app);
    const socket = io(server,{
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    }) 
    
//#endregion

//#region middlesWares  
app.use((REQ,RES,NEXT)=>{    //יש צורך להשים מתודה זו בהתחלה הזרימה על מנת שיהיה תקף לכל המתודות אחריו
    RES.header("Access-Control-Allow-Origin",'*');
    RES.header("Access-Control-Allow-Headers",'Origin, X-Requesed-With , Content-Type , Accept , Authorization');
    if(REQ.method === "OPTIONS"){
          RES.header("Access-Control-Allow-Method",'PUT, POST, PATCH, DELETE, GET');
          return RES.status(200).json({});
    }
    NEXT();
})
//#endregion






socket.on("connection",(socket:Socket)=>{
    console.log("connection")
    global.Game.user = new User();
    


   socket.on("loginMe",(data)=>{Login1(data)})





})



server.listen(3001,()=>{
    console.log("http://121.0.0.1:3001")
})

