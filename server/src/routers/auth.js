const express=require('express');
const router=express.Router();
const UserData=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/users/signin',async(req,res)=>{
    const {email, password}=req.body;
    try{
        const getUser= await UserData.findOne({email} );
        if(!getUser){
            return res.status(404).json({message:"user doesn't exist"});
        }
        const isPassword= await bcrypt.compare(password,getUser.password);
        if(!isPassword) return res.status(400).json({message:'invalid credentials'}); 
        const token=jwt.sign({email:getUser.email,id:getUser._id},'tokenSecretKey',{expiresIn:'1h'});
        res.status(200).json({userProfile:getUser,token})
    }catch(err){
        res.status(500).json({message:'something went wrong'});
    }
})

router.post('/users/signup',async(req,res)=>{
    const {firstName,lastName,email,password,confirmPassword}=req.body;
    try{
        const getUser=await UserData.findOne({email});
        if(getUser){
            return res.status(400).json({message:"user already exist"});
        }
        if(password !==confirmPassword){
            return res.status(400).json({message:"password don't match "});
        }
        const pass= await bcrypt.hash(password,12); 
        const createUser=await UserData.create({name:`${firstName} ${lastName}`,email,password:pass});
        const token=await jwt.sign({email:createUser.email,id:createUser._id},'tokenSecretKey',{expiresIn:'1h'})
        res.status(200).json({userProfile:createUser,token})
    }catch(err){
        console.log(err);
        res.status(500).json({message:err});
    }
})

module.exports=router;