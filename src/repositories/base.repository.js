class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get() {}

  async getOne(query, attributes = []) {
    const options = { where: { ...query } };

    if (attributes?.length) options.attributes = attributes;

    return await this.model.findOne(options);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update() {}

  async delete() {}
}

module.exports = BaseRepository;
