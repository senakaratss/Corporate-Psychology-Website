import express from "express";
import {
  getBlogs,
  getBlogById,
  addBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);

router.post("/", protectRoute, addBlog);
router.put("/:id", protectRoute, updateBlog);
router.delete("/:id", protectRoute, deleteBlog);

export default router;
