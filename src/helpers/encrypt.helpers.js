const bcrypt = require('bcrypt');
const { envVariables } = require('../config');

const hashPassword = async user => {
  return await new Promise((resolve, reject) => {
    bcrypt.genSalt(envVariables.hash.saltRounds, function (err, salt) {
      if (err) reject(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) reject(err);

        resolve(hash);
      });
    });
  });
};

const validatePassword = function (password, encryptedPassword) {
  return bcrypt.compare(password, encryptedPassword);
};

module.exports = { validatePassword, hashPassword };
