const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{
        type:String,
       unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("email is Invalid")
        }
    }
    },
    password:{type:String},
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("something went wrong.....");
            }
        }
    },
skills:{
    type:[String]
}
},{timestamps:true});



module.exports=mongoose.model("User",userSchema);