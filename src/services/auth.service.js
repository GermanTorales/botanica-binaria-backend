const jwt = require('jsonwebtoken');

const { envVariables } = require('../config');
const { userRepository } = require('../repositories');
const { userExceptions } = require('../exceptions');
const { encryptHelpers } = require('../helpers');

const signUp = async newUserData => {
  const { password, confirmPassword } = newUserData;

  if (password !== confirmPassword) throw new userExceptions.PasswordsAreNotTheSame();

  const userCreated = await userRepository.createUser(newUserData);

  return userCreated;
};

const logIn = async logInData => {
  const { email, username, password } = logInData;
  let query = {};

  if (email) query = { email };
  else query = { username };

  const user = await userRepository.findUser(query);

  if (!user) throw new userExceptions.UserNotFound(query);

  const matchPassword = await encryptHelpers.validatePassword(password, user.password);

  if (!matchPassword) throw new userExceptions.InvalidCredentials();

  const payload = { id: user.id, username: user.username, role: user.role };
  const { secret, expiresIn } = envVariables.jwt;

  return jwt.sign(payload, secret, { expiresIn });
};

const me = async id => {
  const user = await userRepository.findUserByAttributes({ id });

  if (!user) throw new userExceptions.UserNotFound({ id });

  const { password, ...data } = user;

  return data;
};

module.exports = { signUp, logIn, me };
