import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// config middlewares
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());


app.get("/api/v1/test",async (req: Request, res: Response) => {
     res.json("Welcome to the brainn API route api/v1/test");
})
import UserRouter from "./routes/user.route";
import ContentRouter from "./routes/content.route";
import workspaceRouter from "./routes/workspace.route";
app.use("/api/v1/user",UserRouter);
app.use("/api/v1/content",ContentRouter);
app.use("/api/v1/workspace",workspaceRouter);


export default app;