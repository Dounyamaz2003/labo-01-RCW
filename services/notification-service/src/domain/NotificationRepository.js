export default class NotificationRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findAll() {
    return await this.model.find().sort({
      createdAt: -1
    });
  }
}