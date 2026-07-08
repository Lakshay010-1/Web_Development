import express from "express"
import { historyCommodity, historyCrypto, historyCurrency, historyStock } from "../controllers/historyAssetsController.js";
const router = express.Router();

router.get("/currency", historyCurrency);

router.get("/stock", historyStock);

router.get("/crypto", historyCrypto);

router.get("/commodity", historyCommodity);

export default router;