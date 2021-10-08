require('dotenv').config();
const express= require("express");

//mongoose connection
const connectDB = require("./connection");

const app=express();

app.get("/",(req,res)=>{
    res.send('hello world');

});

app.post("/user/:id",(req,res)=>{
    res.send(req.params);

});

console.log(process.env.MONGODB_URL);

app.listen(4000,() => 
  connectDB()
  .then( (data) => console.log("server ok"+data))
  .catch((error) => console.log(error))
);
