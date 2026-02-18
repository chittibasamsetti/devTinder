const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auths");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");   

userRouter.get("/requests/received", userAuth, async(req,res)=>{

try{
const loggedUser=req.user;
const connectionRequest=await ConnectionRequest.find({
    toId:loggedUser._id,
    status:"interested"

}
)
.populate("fromId","firstName lastName")

res.json({message:"connection requests received" ,connectionRequest});

}
catch(err){
    res.status(400).send("ERROR :"+err.message);
}

})



userRouter.get("/connections",userAuth,async(req,res)=>{
    try{
        const loggedUser=req.user;
        const connections=await ConnectionRequest.find({
            $or:[
                {fromId:loggedUser._id,  status:"accepted"},
                {toId:loggedUser._id,  status:"accepted"}
            ], 
           
        }).populate("fromId", "firstName lastName")
        .populate("toId", "firstName lastName");
        

        const data=connections.map((value)=>{
            if(value.fromId._id.toString() === loggedUser._id.toString()){
                return value.toId;

            }
            return value.fromId;
        });

        res.json({message:"your connections",data})

    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
})


userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const loggedUser=req.user;

        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        if(limit>10){
            limit=10
        }
        const skip=(page-1)*limit;

        const connectionUsers=await ConnectionRequest.find({
            $or:[
                {fromId:loggedUser._id},{toId:loggedUser._id}
            ]
        });
        console.log(connectionUsers)
const uniqueConnectionUsers=new Set();
    connectionUsers.map((value)=>{
            uniqueConnectionUsers.add(value.fromId);
            uniqueConnectionUsers.add(value.toId);
        });

        const feedUsers=await User.find({
         $and:[
                {_id:{$nin:Array.from(uniqueConnectionUsers)}},
                 {_id:{$ne:loggedUser._id}}
             ]
        }).select("firstName lastName").skip(skip).limit(limit);

        res.json({message:"feed users", feedUsers});
        
    }
    catch(err){
        res.status(400).send("ERROR :"+err.message);
    }

})


module.exports=userRouter;

