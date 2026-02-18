const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auths");
const {validateEditProfileData}=require("../utils/validattion");
const bcrypt=require("bcrypt");
const validator=require("validator");

//profile/view route handler
profileRouter.get("/profile/view", userAuth, async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("EEROR : " + err.message);
    }
});

//profile/edit route handler
profileRouter.patch("/profile/edit",userAuth, async(req,res)=>{
    try{
    if(!validateEditProfileData(req)){
        throw new Error("Edit not allowed");
    }
    const user=req.user;
    // user.firstName=req.body.firstName;
    // user.lastName=req.body.lastName;

    Object.keys(req.body).forEach((key)=>{user[key]=req.body[key]})
    await user.save();
    res.json({message: `${user.firstName}, your profile has updated succesfully`, data: user});
}
    catch(err){
res.status(400).send("ERROR :"+err.message);
}

});

profileRouter.patch("/profile/changePassword",userAuth, async(req,res)=>{
    try{
        const user=req.user;
        
        const {oldPassword, newPassword, confirmPassword}=req.body;
        
        const isSamePassword=await bcrypt.compare(oldPassword, user.password);


        if(!oldPassword || !newPassword || !confirmPassword){
            throw new Error("All fields are required");
        }
        
        else if(!isSamePassword){
            throw new Error("Incorrect password");
        }
        else if(newPassword !== confirmPassword){
            throw new Error("New Password and Confirm Password must be same");
        }else  if(!validator.isStrongPassword(newPassword)){
                throw new Error("PLz enter Strong Password");
            }


         const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword
        await user.save();

        res.send("Changed password is"+"  "+newPassword+"  "+user.password);
    }
    catch(err){
        res.status(400).send("ERROR  :"+err.message);
    }
})


module.exports=profileRouter;