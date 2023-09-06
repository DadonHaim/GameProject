require('module-alias/register')
console.clear()
import CrossMidlleWare from '@MiddleWares/Cross';
import express          from 'express';
import http             from 'http';
import Test from './Tests/Test';
import User from '@Entities/User/User';
import { IRegisterTest } from './Settings/IRegisterSettings';




//#region settings - server
const app = express();
const server = http.createServer(app);





    




server.listen(3001,()=>{
    console.log("http://121.0.0.1:3001")
})

