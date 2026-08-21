export default class EquipmentRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true
    });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async adjustQuantity(id, quantity) {
    return await this.model.findByIdAndUpdate(
      id,
      {
        $inc: {
          availableQuantity: quantity
        }
      },
      {
        returnDocument: "after"
      }
    );
  }
}