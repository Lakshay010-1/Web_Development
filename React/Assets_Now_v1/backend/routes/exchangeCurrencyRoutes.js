import express from "express"
import { exchangeCurrency } from "../controllers/exchangeCurrencyController.js";
const router = express.Router();

router.get("/currency", exchangeCurrency);


export default router