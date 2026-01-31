const mongoose=require("mongoose");

const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://chittibasamsetti_db_user:YViMfBDletTpdCIb@namastenode.eoh1x29.mongodb.net/devtinder");
};

module.exports={connectDb};
