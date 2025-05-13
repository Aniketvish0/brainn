import express from "express";
import { handleCreateContent, handleGetAllcontent } from "../controllers/content.controller";
import { authenticate } from "../middlewares/auth.middleware";

const ContentRouter = express.Router();

ContentRouter.post('/create',authenticate,handleCreateContent);
ContentRouter.get('/allnodes',authenticate,handleGetAllcontent);
// ContentRouter.patch("/update",handleUpdateContent);

export default ContentRouter;