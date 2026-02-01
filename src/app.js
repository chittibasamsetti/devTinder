// const express=require("express");

// const app=express();


// app.get("/ab?c",(req,res)=>{
//     res.send("This is get user server");
// })

// app.post("/user",(req,res)=>{
//     res.send({"name":"chitti","age":23});
// })
// app.use("/test",(req,res)=>{
//     res.send("This is test server just for testing");
// });

// app.use("/",(req,res)=>{
//     res.send("welcome to the home page");
// })

// app.use("/dest",(req,res)=>{
// res.send("This is destination server for testing");
// })

// app.listen(7777,()=>{
//     console.log("Server is running on port 7777");

// });








// ROUTE HANDLERS AND MIDDLEWARS
// const express=require("express");
// const app=express();

// app.get("/",
     
//     [(req,res,next)=>{
        
//         // res.send("this is route handler1")
//         next();
//     }, 
    
//     (req,res,next)=>{
//         next()
//         // res.send("this is route handler2")
//         }],
//     (req,res,next)=>{
//         next()
//         // res.send("this is route handler3")
//     },
//     (req,res,next)=>{
        
//         res.send("this is route handler4")
//     }
// );

// app.listen(7777,()=>{
//     console.log("server is running on the port 7777");
// })





// const express=require("express");
// const app=express();
// const{userAuth}=require("./middlewares/auths");

// app.use("/",userAuth,(req,res,next)=>{
//     res.send("welcome to home page");
// });

// app.get("/user",(req,res)=>{
//     res.send("User data accessed");
// });

// app.listen(7777);


const express=require("express");

const app=express();
const User=require("./models/user");
const {connectDb}=require("./config/database");
app.use(express.json());
// to send the data to database from user dinamically using postman
app.post("/signup",async(req,res)=>{
    const user=new User(
    req.body
    );
await user.save();
res.send("user signed up successfully");
}) 
//to get the user data from database using id
app.get("/user",async(req,res)=>{
    try{
        res.send(await User.findById({_id:req.body._id}));
    }
    catch(err){
res.status(400).send("user not found");
    }
    
})
//to get all the users data from database

app.get("/feed",async(req,res)=>{
    try{
        res.send(await User.find({}));
    }
    catch(err){
res.status(400).send("user not found");
    }
    
})
//create the api to delete the user from database using id
app.delete("/user",async(req,res)=>{
    try{
        await User.findByIdAndDelete({_id:req.body._id});
        res.send("user deleted sucessfully");
    }
    catch(err){
        res.status(400).send("user not found");
    }
        
})

app.put("/user",async(req,res)=>{
    try{
        await User.findByIdAndUpdate({_id:req.body._id},{firstName:req.body.firstName});
        res.send("user updated successfully");
    }
    catch(err){
        res.status(400).send("user not found");
    }
})


connectDb().then(()=>{
    console.log("database connected successfully");
    app.listen(7777,()=>{
    console.log("server is running on the port 7777");
});
}).catch((err)=>{
    console.log("database connection failed");
});

