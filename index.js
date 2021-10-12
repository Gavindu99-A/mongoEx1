require('dotenv').config();
const express= require("express");

//mongoose connection from connection
const connectDB = require("./connection");

//mongoose model from user
const userModel = require("./user");

//import express
const app=express();

//configuration
app.use(express.json());

                  //GET
//route: /
//description: To get all users
//parameter:none
app.get("/",async(req,res)=>{
  const user = await userModel.find();  //use find to take all users
  return res.json({user});
});

//route: /user/type/:type
//description: To get all users based on type
//parameter:type
app.get("/user/type/:type",async(req,res)=>{
   const { type } = req.params;
   const user = await userModel.find({userType:type});

   if(!user){
     return res.json({message :"not found"});
   }

    return res.json({user});
});

//route: /user/:id
//description: To get all users based on id
//parameter:_id
app.get("/user/:_id",async(req,res)=>{
  const { _id } = req.params;
  const user = await userModel.findById(_id);

  if(!user){
    return res.json({message :"not found"});
  }

   return res.json({user});
});

                             //POST
//route: /user/new
//description: To get new users
//parameter:none
//request body: user object
app.post("/user/new",async(req,res)=>{
  //console.log();
  const {newUser} = req.body;
  await userModel.create(newUser);
  return res.json({message:"user created"});
});

                    //PUT
//route: /user/update/:_id
//description: To get new users
//parameter:_id
//request body: user object
app.put("/user/update/:_id",async(req,res)=>{
  const {_id} = req.params;
  const {userData} = req.body;

  const updateUser = await userModel.findByIdAndUpdate(
    _id,
     {$set: userData},
     {new: true}
     );

     return res.json({user:updateUser});
});




console.log(process.env.MONGODB_URL);

app.listen(3000,() => 
  connectDB()
  .then( (data) => console.log("server ok"+data))
  .catch((error) => console.log(error))
);
