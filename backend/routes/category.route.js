import express from "express";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protectRoute, addCategory);
router.delete("/:id", protectRoute, deleteCategory);

export default router;
