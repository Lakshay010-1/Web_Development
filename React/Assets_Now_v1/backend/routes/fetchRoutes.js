import express from "express"
import { fetchNews } from "../controllers/fetchController.js";
const router = express.Router();

router.get("/news", fetchNews);

export default router