class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get({ query = {}, attributes = [], include = [] }) {
    const options = {};

    if (Object.keys(query).length) options.where = { ...query };
    if (attributes?.length) options.attributes = attributes;
    if (include?.length) options.include = include;

    return await this.model.findAll(options);
  }

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
