import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";
import privateServiceRoutes from "./routes/privateService.route.js";
import categoryRoutes from "./routes/category.route.js";
import blogRoutes from "./routes/blog.route.js";
import contactRoutes from "./routes/contact.route.js";
import FAQRoutes from "./routes/faq.route.js";
import aboutRoutes from "./routes/about.route.js";
import messageRoutes from "./routes/message.route.js";
import appointmentRoutes from "./routes/appointment.route.js";

import { createInitialAdmin } from "./config/adminSeed.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // cookie ve auth için
  })
);
app.use(express.json({ limit: "10mb" })); // 10 MB limit
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/private-services", privateServiceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/faq", FAQRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectMongoDB().then(() => {
    createInitialAdmin();
  });
});
