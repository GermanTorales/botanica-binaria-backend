const jwt = require("jsonwebtoken");

const { envVariables } = require("../config");
const { userRepository } = require("../repositories");
const { userExceptions } = require("../exceptions");

const signUp = async (newUserData) => {
  try {
    const { password, confirmPassword } = newUserData;

    if (password !== confirmPassword) throw new userExceptions.PasswordsAreNotTheSame();

    const userCreated = await userRepository.createUser(newUserData);

    return userCreated;
  } catch (error) {
    throw error;
  }
};

const logIn = async (logInData) => {
  try {
    const { email, username, password } = logInData;
    let query = {};

    if (email) query = { email };
    else query = { username };

    const user = await userRepository.findUser(query);

    if (!user) throw new userExceptions.UserNotFound(query);

    const matchPassword = await user.validatePassword(password);

    if (!matchPassword) throw new userExceptions.InvalidCredentials();

    const payload = { id: user.id, username: user.username };

    return jwt.sign(payload, envVariables.jwtKey);
  } catch (error) {
    throw error;
  }
};

module.exports = { signUp, logIn };
