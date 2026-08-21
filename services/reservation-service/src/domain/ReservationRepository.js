export default class ReservationRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return await this.model.find().sort({
      createdAt: -1
    });
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(
      id,
      data,
      {
        returnDocument: "after",
        runValidators: true
      }
    );
  }
}