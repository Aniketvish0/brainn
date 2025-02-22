import  express  from "express";
import { handleCreateContent, handleUpdateContent } from "../controllers/content.controller";

const ContentRouter = express.Router();

ContentRouter.post("/create",handleCreateContent);
ContentRouter.patch("/update",handleUpdateContent);

export default ContentRouter;