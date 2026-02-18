const express=require("express");
const requestRouter=express.Router();
const{userAuth}=require("../middlewares/auths");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");


requestRouter.post("/request/send/:status/:_id",userAuth,async(req,res)=>{
    const user=req.user;
    try{
        const fromId=user._id;
        const toId=req.params._id;
        const status=req.params.status;

      const allowedStatus=["interested","ignored"];
      const isAllowedStatus=allowedStatus.includes(status);
      if(!isAllowedStatus){
        throw new Error("Invalid status");
      }

      const existingRequest=await ConnectionRequest.findOne({
        $or: [{fromId,toId},
            {fromId:toId,toId:fromId}
        ]
    });
    if(existingRequest){
        throw new Error("Request already exists");
    }
if(fromId.equals(toId)){
        throw new Error ("you cant send request to yourself");
    }

    const toUser=await User.findById({_id:toId});

    if(!toUser){
        throw new Error("User not found");
    }

    const connectionRequest=new ConnectionRequest({
    fromId,
    toId,
    status
});


    
 const data=await connectionRequest.save();

 
 res.json({message:`${user.firstName}, send ${status} to ${toUser.firstName}`,data});
    }
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
});


requestRouter.post("/request/review/:status/:requestedId", userAuth, async(req,res)=>{


    try{
        const loggedUser=req.user;
        const {status,requestedId}=req.params;

        const allowedStatus=["accepted","rejected"];
        const isAllowedStatus=allowedStatus.includes(status);
        if(!isAllowedStatus){
            throw new Error("Invalid Status");
        }

        const connectionRequest=await ConnectionRequest.findOne({
            _id:requestedId,
            toId:loggedUser._id,
            status:"interested"

        })
        if(!connectionRequest){
            throw new Error("Request not found");
        }


        connectionRequest.status=status;
        const data=await connectionRequest.save();
        res.json({message:loggedUser.firstName+status+"the request",data});

    }
    catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
   

});

module.exports=requestRouter;