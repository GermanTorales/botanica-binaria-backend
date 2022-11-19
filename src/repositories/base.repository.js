const { logger } = require("../config");

class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async find() {}

  async create(data) {
    return await this.model.create(data);
  }

  async update() {}

  async delete() {}
}

module.exports = BaseRepository;
