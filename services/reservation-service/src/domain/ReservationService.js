import axios from "axios";
import Reservation from "./Reservation.js";

export default class ReservationService {
  constructor(repository) {
    this.repository = repository;

    this.clientUrl =
      process.env.CLIENT_SERVICE_URL ||
      "http://localhost:4001/api/clients";

    this.equipmentUrl =
      process.env.EQUIPMENT_SERVICE_URL ||
      "http://localhost:4002/api/equipments";

    this.notificationUrl =
      process.env.NOTIFICATION_SERVICE_URL ||
      "http://localhost:4004/api/notifications";
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    const reservation = await this.repository.findById(id);

    if (!reservation) {
      throw new Error("Réservation introuvable");
    }

    return reservation;
  }

  async create(data) {
    const reservation = new Reservation(data);

    if (!reservation.isValid()) {
      throw new Error("Données de réservation invalides");
    }

    let client;
    let equipment;

    try {
      const clientResponse = await axios.get(
        `${this.clientUrl}/${reservation.clientId}`
      );

      client = clientResponse.data;
    } catch (error) {
      throw new Error("Client introuvable");
    }

    try {
      const equipmentResponse = await axios.get(
        `${this.equipmentUrl}/${reservation.equipmentId}`
      );

      equipment = equipmentResponse.data;
    } catch (error) {
      throw new Error("Matériel introuvable");
    }

    if (equipment.availableQuantity < reservation.quantity) {
      throw new Error("Quantité insuffisante");
    }

    try {
      await axios.put(
        `${this.equipmentUrl}/${reservation.equipmentId}/reserve`,
        {
          quantity: reservation.quantity
        }
      );
    } catch (error) {
      throw new Error("Quantité insuffisante");
    }

    reservation.clientName = client.name;
    reservation.equipmentName = equipment.name;
    reservation.totalPrice = reservation.calculateTotal(
      equipment.dailyPrice
    );
    reservation.status = "CONFIRMED";

    let savedReservation;

    try {
      savedReservation = await this.repository.create({
        clientId: reservation.clientId,
        equipmentId: reservation.equipmentId,
        clientName: reservation.clientName,
        equipmentName: reservation.equipmentName,
        quantity: reservation.quantity,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        totalPrice: reservation.totalPrice,
        status: reservation.status
      });
    } catch (error) {
      await axios.put(
        `${this.equipmentUrl}/${reservation.equipmentId}/release`,
        {
          quantity: reservation.quantity
        }
      );

      throw error;
    }

    try {
      await axios.post(this.notificationUrl, {
        recipient: client.email,
        message: `Réservation confirmée pour ${client.name}.`,
        type: "CONFIRMATION"
      });
    } catch (error) {
      console.error("Erreur notification :", error.message);
    }

    return savedReservation;
  }

  async cancel(id) {
    const reservation = await this.repository.findById(id);

    if (!reservation) {
      throw new Error("Réservation introuvable");
    }

    if (reservation.status === "CANCELLED") {
      throw new Error("Réservation déjà annulée");
    }

    await axios.put(
      `${this.equipmentUrl}/${reservation.equipmentId}/release`,
      {
        quantity: reservation.quantity
      }
    );

    let updatedReservation;

    try {
      updatedReservation = await this.repository.update(id, {
        status: "CANCELLED"
      });
    } catch (error) {
      await axios.put(
        `${this.equipmentUrl}/${reservation.equipmentId}/reserve`,
        {
          quantity: reservation.quantity
        }
      );

      throw error;
    }

    try {
      const clientResponse = await axios.get(
        `${this.clientUrl}/${reservation.clientId}`
      );

      await axios.post(this.notificationUrl, {
        recipient: clientResponse.data.email,
        message: `Réservation annulée pour ${clientResponse.data.name}.`,
        type: "CANCELLATION"
      });
    } catch (error) {
      console.error("Erreur notification :", error.message);
    }

    return updatedReservation;
  }
}