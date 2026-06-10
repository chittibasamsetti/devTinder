const express=require("express");
const authRouter=express.Router();
const bcrypt=require("bcrypt");
const User=require("../models/user");
const {validateSignUpData}=require("../utils/validattion");
const {userAuth}=require("../middlewares/auths");   

//signup route handler
authRouter.post("/signup", async(req,res)=>{
    
    try{
        validateSignUpData(req);

const {firstName, lastName, email, password}=req.body;
        const passwordHash=await bcrypt.hash(password,10);

        const user=new User(
    {firstName, lastName, email, password:passwordHash}
    );
        await user.save();
res.send("user signed up successfully");
    }
    catch(err){
        res.status(400).send("ERROR :"+err.message);
    };

}) 


//login route handler
authRouter.post("/login", async(req,res)=>{
    const {email, password}=req.body;    
    try{
        const user=await User.findOne({email:email});
        // console.log(user);
        if(!user){
            throw new Error("email not found");
        }
        const isPasswordMatch=await user.validatePassword(password);
        if(!isPasswordMatch){
            throw new Error("password incorrect");
        }
        else{
            const token= await user.getJWT();
            res.cookie("token", token,);
            res.send(user);
        }

    }
    catch(err){
res.status(400).send("ERROR :"+err.message);
    }
})

//logout route handler
authRouter.post("/logout", async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("user logout successfully");
});

module.exports=authRouter;
