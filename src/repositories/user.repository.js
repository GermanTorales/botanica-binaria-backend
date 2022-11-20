const BaseRepository = require("./base.repository");
const { User } = require("../models");

class UserRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async createUser(userData) {
    try {
      return await this.create(userData);
    } catch (error) {
      if (error?.name === "SequelizeUniqueConstraintError") {
        const { detail } = error?.parent;
        const [[key]] = Object.entries(error?.fields);

        if (key === "username") throw new userExceptions.UsernameAlreadyExist(detail, key);
        if (key === "email") throw new userExceptions.EmailAlreadyExist(detail, key);
      }

      throw error;
    }
  }

  async findUser(query) {
    return await this.getOne(query);
  }
}

const userRepository = new UserRepository(User);

module.exports = userRepository;
