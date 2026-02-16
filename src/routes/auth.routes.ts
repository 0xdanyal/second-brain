import { Router } from "express";
import { signupLogic, signinLogic } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signupLogic);
router.post("/signin", signinLogic);

export default router;
