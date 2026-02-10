const express=require("express");
const requestRouter=express.Router();
const{userAuth}=require("../middlewares/auths");

requestRouter.get("/sendingRequest",userAuth,(req,res)=>{
    const user=req.user;
    try{
res.send(user.firstName +"  has sent the request successfully");
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});

module.exports=requestRouter;