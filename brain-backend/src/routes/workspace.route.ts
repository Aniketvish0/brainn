import express  from "express";
import { handleCreateWorkspace } from "../controllers/workspace.controller";
import { authenticate } from "../middlewares/auth.middleware";

const workspaceRouter = express.Router();

workspaceRouter.post("/create",authenticate,handleCreateWorkspace);

export default workspaceRouter;