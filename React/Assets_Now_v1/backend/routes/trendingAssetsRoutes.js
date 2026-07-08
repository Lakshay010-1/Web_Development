import express from "express"
const router = express.Router();
import { trendingCrypto, trendingStocks } from "../controllers/trendingAssetsController.js";

router.get("/crypto", trendingCrypto);

router.get("/stocks", trendingStocks);

export default router;