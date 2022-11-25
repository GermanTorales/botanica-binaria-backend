class NotLogin extends Error {
  constructor() {
    super('Please login to access');
  }
}

class TokenNotFound extends Error {
  constructor() {
    super('The token was not sent in the headers');
  }
}

class NotAdmin extends Error {
  constructor(role) {
    super(`User role [${role}] not allowed`);
  }
}

module.exports = { NotLogin, TokenNotFound, NotAdmin };
