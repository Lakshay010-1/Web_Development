// Authorization level-2 ( Encryption using crypto )

import { Router } from "express";
import { authorizeEncrypt, registerEncrypt } from "../controllers/auth.l2.encrypt.controller.js";

const router = Router();

router.post("/authorizeLvl2", authorizeEncrypt);
router.post("/registerLvl2", registerEncrypt);

export default router;