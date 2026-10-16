const mongoose  = require("mongoose");



async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://yt:mA67qTIjK5DsOvag@yt-backend.ddm7gm5.mongodb.net/commet");
        console.log("Database is connected successfully");
    } catch (err) {
        console.log("database connection error:",err);
       
    }
   
}


module.exports=connectDB;