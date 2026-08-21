import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://127.0.0.1:27017/eventia_clients";

app.get("/health", (req, res) => {
  res.json({
    service: "client-service",
    status: "UP"
  });
});

app.use("/api/clients", routes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");

    app.listen(PORT, () => {
      console.log(`client-service sur le port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur MongoDB :", error);
  });