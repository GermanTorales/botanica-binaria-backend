const { authRepository } = require("../repositories");
const { userExceptions } = require("../exceptions");

const signUp = async (newUserData) => {
  try {
    const { password, confirmPassword } = newUserData;

    if (password !== confirmPassword) throw new userExceptions.PasswordsAreNotTheSame();

    const userCreated = await authRepository.createUser(newUserData);

    return userCreated;
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      const { detail } = error?.parent;
      const [[key]] = Object.entries(error?.fields);

      if (key === "username") throw new userExceptions.UsernameAlreadyExist(detail, key);
      if (key === "email") throw new userExceptions.EmailAlreadyExist(detail, key);
    }

    throw error;
  }
};

module.exports = { signUp };
