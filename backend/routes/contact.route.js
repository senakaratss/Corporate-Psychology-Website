import express from "express";
import {
  getContactInfo,
  upsertContactInfo,
} from "../controllers/contact.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getContactInfo);

router.post("/", protectRoute, upsertContactInfo); // hem ekle hem güncelle

export default router;
