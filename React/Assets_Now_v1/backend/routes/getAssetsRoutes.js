import express from "express"
import { getCommodity, getCrypto, getStock } from "../controllers/getAssetsController.js";
const router = express.Router();

router.get("/commodity", getCommodity);

router.get("/stock", getStock);

router.get("/crypto", getCrypto);


export default router