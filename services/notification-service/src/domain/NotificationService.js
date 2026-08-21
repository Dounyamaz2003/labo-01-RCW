import Notification from "./Notification.js";

export default class NotificationService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async create(data) {
    const notification = new Notification(data);

    if (!notification.isValid()) {
      throw new Error("Notification invalide");
    }

    return await this.repository.create({
      recipient: notification.recipient,
      message: notification.message,
      type: notification.type
    });
  }
}