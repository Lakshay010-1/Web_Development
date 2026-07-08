import express from "express";
import { addListAsset, deleteListAsset, fetchListAssets } from "../controllers/listController.js";

const router = express.Router({ mergeParams: true });

router.get("/", fetchListAssets);

router.post("/", addListAsset);

router.delete("/:id", deleteListAsset);

export default router;