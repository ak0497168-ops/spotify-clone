require('dotenv').config();
const app=require('./src/app');
const connectDB=require("./src/db/db");

connectDB();  
console.log("Public:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("Private:", process.env.IMAGEKIT_PRIVATE_KEY);
console.log("Endpoint:", process.env.IMAGEKIT_URL_ENDPOINT);

console.log(process.env.MONGO_URI);
console.log(process.env.JWT_SECRET);



app.listen(3000,()=>{
    console.log("server is running on port 3000");
})