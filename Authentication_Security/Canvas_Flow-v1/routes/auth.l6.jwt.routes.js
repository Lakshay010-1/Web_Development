// Authorization Level-6 (JWT Token)

import { Router } from "express";
import { authorizeJWT, registerJWT } from "../controllers/auth.l6.jwt.controller.js";

const router = Router();

router.post("/authorizeLvl6", authorizeJWT);
router.post("/registerLvl6", registerJWT);

export default router;