import express from "express";
import {
  addMessage,
  getMessages,
  deleteMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/", addMessage);

router.get("/", protectRoute, getMessages);
router.delete("/:id", protectRoute, deleteMessage);

export default router;
