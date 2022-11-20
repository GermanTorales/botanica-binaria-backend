class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get() {}

  async getOne(query) {
    return await this.model.findOne({ where: { ...query } });
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update() {}

  async delete() {}
}

module.exports = BaseRepository;
