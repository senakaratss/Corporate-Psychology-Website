import express from "express";
import { getAbout, upsertAbout } from "../controllers/about.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getAbout);
router.post("/", protectRoute, upsertAbout); // ekle / güncelle (upsert)

export default router;
