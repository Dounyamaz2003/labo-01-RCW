import { Router } from "express";
import mongoose from "mongoose";
import NotificationRepository from "./domain/NotificationRepository.js";
import NotificationService from "./domain/NotificationService.js";

const router = Router();

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "INFO"
    }
  },
  {
    timestamps: true
  }
);

const NotificationModel = mongoose.model(
  "Notification",
  notificationSchema
);

const repository = new NotificationRepository(NotificationModel);
const service = new NotificationService(repository);

router.get("/", async (req, res) => {
  try {
    const notifications = await service.getAll();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const notification = await service.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

export default router;