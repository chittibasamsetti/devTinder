const express=require("express");

const app=express();

app.use("/test",(req,res)=>{
    res.send("This is test server just for testing");
});

app.use("/dest",(req,res)=>{
res.send("This is destination server for testing");
})

app.listen(7777,()=>{
    console.log("Server is running on port 7777");

});