import Equipment from "./Equipment.js";

export default class EquipmentService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    const equipment = await this.repository.findById(id);

    if (!equipment) {
      throw new Error("Matériel introuvable");
    }

    return equipment;
  }

  async create(data) {
    const equipment = new Equipment(data);

    if (!equipment.isValid()) {
      throw new Error("Données du matériel invalides");
    }

    return await this.repository.create({
      name: equipment.name,
      category: equipment.category,
      dailyPrice: equipment.dailyPrice,
      availableQuantity: equipment.availableQuantity
    });
  }

  async update(id, data) {
    const existingEquipment = await this.repository.findById(id);

    if (!existingEquipment) {
      throw new Error("Matériel introuvable");
    }

    const equipment = new Equipment({
      name: data.name ?? existingEquipment.name,
      category: data.category ?? existingEquipment.category,
      dailyPrice: data.dailyPrice ?? existingEquipment.dailyPrice,
      availableQuantity:
        data.availableQuantity ?? existingEquipment.availableQuantity
    });

    if (!equipment.isValid()) {
      throw new Error("Données du matériel invalides");
    }

    return await this.repository.update(id, {
      name: equipment.name,
      category: equipment.category,
      dailyPrice: equipment.dailyPrice,
      availableQuantity: equipment.availableQuantity
    });
  }

  async reserve(id, quantity) {
    quantity = Number(quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Quantité invalide");
    }

    const equipment = await this.repository.findById(id);

    if (!equipment) {
      throw new Error("Matériel introuvable");
    }

    if (equipment.availableQuantity < quantity) {
      throw new Error("Quantité insuffisante");
    }

    return await this.repository.adjustQuantity(id, -quantity);
  }

  async release(id, quantity) {
    quantity = Number(quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Quantité invalide");
    }

    const equipment = await this.repository.findById(id);

    if (!equipment) {
      throw new Error("Matériel introuvable");
    }

    return await this.repository.adjustQuantity(id, quantity);
  }

  async delete(id) {
    const equipment = await this.repository.findById(id);

    if (!equipment) {
      throw new Error("Matériel introuvable");
    }

    return await this.repository.delete(id);
  }
}