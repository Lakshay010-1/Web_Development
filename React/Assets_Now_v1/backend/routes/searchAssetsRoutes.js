import express from "express"
import { searchCrypto, searchStock } from "../controllers/searchAssetsController.js";
const router = express.Router();


router.get("/stock", searchStock);

router.get("/crypto", searchCrypto);

export default router