import { Router } from "express";
import { signUpUser, signInUser, signOutUser } from "../controllers/home.controller.js";

const router = Router();

router.get("/", signInUser);
router.get("/authorize", signUpUser);
router.get("/logout", signOutUser);

export default router;
