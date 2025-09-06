// Authorization level-4 ( Hashing + Salt using bcrypt ) 

import { Router } from "express";
import { authorizeSalt, registerSalt } from "../controllers/auth.l4.salt.controller.js";

const router = Router();

router.post("/authorizeLvl4", authorizeSalt);
router.post("/registerLvl4", registerSalt);

export default router;