import express from "express";
import { handleUserSignin, handleUserSignup } from "../controllers/user.controller";

const UserRouter = express.Router();

UserRouter.post("/signup",handleUserSignup)
UserRouter.post("/signin",handleUserSignin)

export default UserRouter