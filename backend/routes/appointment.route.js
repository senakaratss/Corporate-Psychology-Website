import express from "express";
import {
  createAppointment,
  getAppointments,
  getBookedTimes,
} from "../controllers/appointment.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/booked/:date", getBookedTimes);

router.get("/", protectRoute, getAppointments);

export default router;
