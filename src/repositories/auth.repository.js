const BaseRepository = require("./base.repository");
const { User } = require("../models");

class AuthRepository extends BaseRepository {
  constructor(model) {
    super(model);
    this.model = model;
  }

  async createUser(userData) {
    return await this.model.create(userData);
  }
}

const authRepository = new AuthRepository(User);

module.exports = authRepository;
