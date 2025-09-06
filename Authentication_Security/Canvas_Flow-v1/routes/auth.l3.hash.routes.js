// Authorization level-3 ( Hashing using md5 )

import { Router } from "express";
import { authorizeHash, registerHash } from "../controllers/auth.l3.hash.controller.js";

const router = Router();

router.post("/authorizeLvl3", authorizeHash);
router.post("/registerLvl3", registerHash);

export default router;