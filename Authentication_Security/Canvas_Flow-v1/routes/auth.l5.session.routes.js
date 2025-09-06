// Authorization level-5 ( Session cookie and Hashing + Salt using express-session and passport ) 

import { Router } from "express";
import { authorizeSession, registerSession } from "../controllers/auth.l5.session.controller.js";

const router = Router();

router.post("/authorizeLvl5", authorizeSession);
router.post("/registerLvl5", registerSession);

export default router;