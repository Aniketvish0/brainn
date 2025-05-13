import connectDB from "./config/mongo.db";
import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT || 4040;
connectDB()
    .then(() => {
       app.on("error",(error)=>{
          console.log(error);
       })
       app.listen(PORT, () => {
        console.log(`Listening at port ${PORT}`);
      });
    })
    .catch((e)=>{
       console.log("Connection error");
});