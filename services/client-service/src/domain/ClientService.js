import Client from "./Client.js";

export default class ClientService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    const client = await this.repository.findById(id);

    if (!client) {
      throw new Error("Client introuvable");
    }

    return client;
  }

  async create(data) {
    const client = new Client(data);

    if (!client.isValid()) {
      throw new Error("Données du client invalides");
    }

    const existingClient = await this.repository.findByEmail(client.email);

    if (existingClient) {
      throw new Error("Ce courriel est déjà utilisé");
    }

    return await this.repository.create({
      name: client.name,
      email: client.email,
      phone: client.phone
    });
  }

  async update(id, data) {
    const existingClient = await this.repository.findById(id);

    if (!existingClient) {
      throw new Error("Client introuvable");
    }

    const client = new Client({
      name: data.name ?? existingClient.name,
      email: data.email ?? existingClient.email,
      phone: data.phone ?? existingClient.phone
    });

    if (!client.isValid()) {
      throw new Error("Données du client invalides");
    }

    const clientWithEmail = await this.repository.findByEmail(client.email);

    if (
      clientWithEmail &&
      clientWithEmail._id.toString() !== id
    ) {
      throw new Error("Ce courriel est déjà utilisé");
    }

    return await this.repository.update(id, {
      name: client.name,
      email: client.email,
      phone: client.phone
    });
  }

  async delete(id) {
    const client = await this.repository.findById(id);

    if (!client) {
      throw new Error("Client introuvable");
    }

    return await this.repository.delete(id);
  }
}