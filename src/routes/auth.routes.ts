import { Router } from "express";
// const {Router} = require("express");
import { signupLogic } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signupLogic);


// router.post("/siginin", );


export default router;
