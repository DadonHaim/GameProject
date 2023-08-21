

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
var cors = require('cors')
app.use(cors())




app.use((req,res,next)=>{
    console.log("fetch")
    next();
})

app.get('/start',(req,res)=>{
    
    let states={
        isLogin : true,
    }
    res.json({states})
})
app.get('/game',(req,res)=>{
    
    let states={
        location : "selectAvatar",
    }
    res.json({states})
})



app.listen(3001);  