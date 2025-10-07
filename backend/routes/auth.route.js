import express from "express";
import {
  login,
  logout,
  updatePassword,
  getMe,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-password", protectRoute, updatePassword);

export default router;
