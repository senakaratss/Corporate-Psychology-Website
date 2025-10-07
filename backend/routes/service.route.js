import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getServices,
  getServiceById,
  addService,
  deleteService,
  updateService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", protectRoute, getServiceById);
router.post("/", protectRoute, addService);
router.delete("/:id", protectRoute, deleteService);
router.put("/:id", protectRoute, updateService);

export default router;
