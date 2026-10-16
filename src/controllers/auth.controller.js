const usermodel=require('../models/user.model');
const Jwt=require("jsonwebtoken");
require('dotenv').config();
const bcrypt=require('bcryptjs');



async function registerUser(req,res){
    const{username,email,password,role="user"}=req.body;
    const isUserAlreadyExists=await usermodel.findOne({
       $or:[
        {username},
        {email}
       ]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }

    const hash=await bcrypt.hash(password,10);
    const user=await usermodel.create({
        username,email,password:hash,role
    })
  
    const token=Jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token);
    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}

async function loginUser(req,res) {
      console.log("this work");
    const {username,email,password}=req.body;
  

    const user = await usermodel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({message:"Invalid credentials"})
    }
    const token =Jwt.sign({
        id:user._id,
        role:user.role
    }, process.env.JWT_SECRET)

res.cookie("token",token);

res.status(200).json({
    message:"User login in successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role,
    }
})


}

module.exports={registerUser,loginUser};
