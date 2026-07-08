import express from "express";
import { deleteUser, signInUser, signOutUser, signUpUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", signUpUser);

router.post("/login", signInUser);

router.post("/logout", signOutUser);

router.delete("/", deleteUser);

export default router;