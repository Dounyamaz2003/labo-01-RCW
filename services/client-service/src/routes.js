import { Router } from "express";
import mongoose from "mongoose";
import ClientRepository from "./domain/ClientRepository.js";
import ClientService from "./domain/ClientService.js";

const router = Router();

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const ClientModel = mongoose.model("Client", clientSchema);

const repository = new ClientRepository(ClientModel);
const service = new ClientService(repository);

router.get("/", async (req, res) => {
  try {
    const clients = await service.getAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const client = await service.getById(req.params.id);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const client = await service.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const client = await service.update(
      req.params.id,
      req.body
    );

    res.status(200).json(client);
  } catch (error) {
    const status =
      error.message === "Client introuvable"
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