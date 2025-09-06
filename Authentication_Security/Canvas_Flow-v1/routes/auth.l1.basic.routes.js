// Authorization level-1 ( Basic Authentication ) 

import { Router } from "express";
import { authorizeBasic, registerBasic } from "../controllers/auth.l1.basic.controller.js";

const router = Router();

router.post("/authorizeLvl1", authorizeBasic);
router.post("/registerLvl1", registerBasic);

export default router;