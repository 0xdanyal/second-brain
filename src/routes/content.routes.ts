import { Router } from "express";
import { authMiddleware } from "../middleware";
import { contentController, getSharedContent, shareContent } from "../controllers/content.controller";
import { deleteContent } from "../controllers/content.controller";

const router = Router();

router.post("/content", authMiddleware, contentController); // create content
router.delete("/content", authMiddleware, deleteContent); // delete content
router.put("/content/share", authMiddleware, shareContent); // share content
router.get("/brain/:shareLink", authMiddleware, getSharedContent); // get shared content

export default router;
