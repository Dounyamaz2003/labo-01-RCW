import { Router } from "express";
import mongoose from "mongoose";
import EquipmentRepository from "./domain/EquipmentRepository.js";
import EquipmentService from "./domain/EquipmentService.js";

const router = Router();

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    dailyPrice: {
      type: Number,
      required: true,
      min: 0
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const EquipmentModel = mongoose.model("Equipment", equipmentSchema);

const repository = new EquipmentRepository(EquipmentModel);
const service = new EquipmentService(repository);

router.get("/", async (req, res) => {
  try {
    const equipments = await service.getAll();
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const equipment = await service.getById(req.params.id);
    res.status(200).json(equipment);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const equipment = await service.create(req.body);
    res.status(201).json(equipment);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const equipment = await service.update(
      req.params.id,
      req.body
    );

    res.status(200).json(equipment);
  } catch (error) {
    const status =
      error.message === "Matériel introuvable"
        ? 404
        : 400;

    res.status(status).json({
      message: error.message
    });
  }
});

router.put("/:id/reserve", async (req, res) => {
  try {
    const equipment = await service.reserve(
      req.params.id,
      req.body.quantity
    );

    res.status(200).json(equipment);
  } catch (error) {
    const status =
      error.message === "Matériel introuvable"
        ? 404
        : 400;

    res.status(status).json({
      message: error.message
    });
  }
});

router.put("/:id/release", async (req, res) => {
  try {
    const equipment = await service.release(
      req.params.id,
      req.body.quantity
    );

    res.status(200).json(equipment);
  } catch (error) {
    const status =
      error.message === "Matériel introuvable"
        ? 404
        : 400;

    res.status(status).json({
      message: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

export default router;