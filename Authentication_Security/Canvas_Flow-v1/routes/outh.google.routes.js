// Open Authorization

import { Router } from "express";
import passport from "passport";
import { googleCallback } from "../controllers/oauth.google.controller.js";


const router = Router();

router.get("/", passport.authenticate("google", {
    scope: ["openid", "profile", "email"]
}));

router.get("/canvas", passport.authenticate("google", {
    failureRedirect: "/authorize"
}), googleCallback);

export default router;
