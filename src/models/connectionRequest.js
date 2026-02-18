const mongoose=require("mongoose");


const connectionRequestSchema=new mongoose.Schema({
    fromId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    toId:{type:mongoose.Schema.ObjectId,ref:"User"},
    status:{type:String,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{value} is not this status`
        }
    }
    
},{
        timestamps:true
    });

    connectionRequestSchema.index({fromId:1,toId:1});

    module.exports=new mongoose.model("ConnectionRequest",connectionRequestSchema);