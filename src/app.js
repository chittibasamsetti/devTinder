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


const {connectDb}=require("./config/database");
const app=express();
const User=require("./models/user")


app.post("/signup", async (req,res)=>{
    const user=new User({
        firstName:"chitti",
        lastName:"basamsetti",
        age:23
    });

    try{
        await user.save();
        res.send("user signedup successfully");
    }
    catch(err){
        res.status(400).send("error in signing up the useer"+err);
    }
});
connectDb().then(()=>{
    console.log("Dtabase is connected era chittoda");
}).catch((err)=>{
    console.error("database is not conneccted");
});

app.listen(7777,()=>{
    console.log("server is running on the port 7777");
})