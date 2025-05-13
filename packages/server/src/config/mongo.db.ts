import mongoose from "mongoose";

const connectDB = async() => {
   try{
     const conn = await mongoose.connect(process.env.MONGO_URI!);
     console.log(`Connection established to DB : ${conn.connection.host}`);
   }catch(e){
     console.error("Error while Connecting to DB ", e);
     process.exit(1);
   }
}

export default connectDB;