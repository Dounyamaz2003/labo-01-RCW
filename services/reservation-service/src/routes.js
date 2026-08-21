import { Router } from "express";
import mongoose from "mongoose";
import ReservationRepository from "./domain/ReservationRepository.js";
import ReservationService from "./domain/ReservationService.js";

const router = Router();

const reservationSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true
    },
    equipmentId: {
      type: String,
      required: true
    },
    clientName: {
      type: String,
      required: true
    },
    equipmentName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: "CONFIRMED"
    }
  },
  {
    timestamps: true
  }
);

const ReservationModel = mongoose.model(
  "Reservation",
  reservationSchema
);

const repository = new ReservationRepository(ReservationModel);
const service = new ReservationService(repository);

router.get("/", async (req, res) => {
  try {
    const reservations = await service.getAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reservation = await service.getById(req.params.id);
    res.status(200).json(reservation);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const reservation = await service.create(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

const cancelReservation = async (req, res) => {
  try {
    const reservation = await service.cancel(req.params.id);
    res.status(200).json(reservation);
  } catch (error) {
    const status =
      error.message === "Réservation introuvable"
        ? 404
        : 400;

    res.status(status).json({
      message: error.message
    });
  }
};

router.put("/:id/cancel", cancelReservation);
router.patch("/:id/cancel", cancelReservation);

export default router;