import express          from 'express';
import http             from 'http';
import CrossMidlleWare  from '@MiddleWares/cross';
import io,{Socket}      from 'socket.io';
import User             from '@Entities/User/User';
import Avatar           from '@Entities/Avatar/Avatar';


    
    //#region settings - server
    const app = express();
    const server = http.createServer(app);
    const socket = require("socket.io")(
        server,
        {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
        }
    }) 
    //#endregion

    //#region middlesWares  
        app.use(CrossMidlleWare);
    //#endregion





server.listen(3001,()=>{
    console.log("http://121.0.0.1:3001")
})

