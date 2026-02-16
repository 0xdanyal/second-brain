import { Router } from "express";
import { authMiddleware } from "../middleware";
import { contentController } from "../controllers/content.controller";
// import { deleteContent } from "../controllers/content.controller";

const router = Router();

router.post("/content", authMiddleware, contentController); // create content
// router.delete("/content", authMiddleware, deleteContent); // delete content

export default router;
