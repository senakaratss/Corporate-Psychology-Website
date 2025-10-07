import express from "express";
import { getFAQs, addFAQ, deleteFAQ } from "../controllers/faq.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getFAQs);
router.post("/", protectRoute, addFAQ);
router.delete("/:id", protectRoute, deleteFAQ);

export default router;
