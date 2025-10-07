import express from "express";
import {
  getPrivateServices,
  addPrivateService,
  deletePrivateService,
  updatePrivateService,
} from "../controllers/privateServices.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getPrivateServices);
router.post("/", protectRoute, addPrivateService);
router.delete("/:id", protectRoute, deletePrivateService);
router.put("/:id", protectRoute, updatePrivateService);

export default router;
