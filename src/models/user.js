const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");


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
    password:{type:String,
       
    },
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
},
about:{type:String,
    maxlength:200,
    default:"Hey there! I am using DevTinder."
}
},{timestamps:true});

userSchema.index({firstName:1});
userSchema.index({lastName:1});

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"secret",{expiresIn:"7d"});
    return token;
};

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPassword=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPassword;
};

module.exports=mongoose.model("User",userSchema);