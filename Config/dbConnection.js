const mongoose= require('mongoose')
 const connectDB= async()=>{
    try {
        const connect= mongoose.connect(process.env.CONNECTION_STRING)
        console.log('DATABASE CONNECTED SUCESSFULLY');
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
 }
 module.exports=connectDB