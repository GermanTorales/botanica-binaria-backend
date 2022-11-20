class UsernameAlreadyExist extends Error {
  constructor(message, key) {
    super(message);

    this.key = key;
  }
}

class EmailAlreadyExist extends Error {
  constructor(message, key) {
    super(message);

    this.key = key;
  }
}

class PasswordsAreNotTheSame extends Error {
  constructor() {
    super("Passwords are not the same");
  }
}

class UserNotFound extends Error {
  constructor(data) {
    super(`User with ${JSON.stringify(data)} not found`);
  }
}

class InvalidCredentials extends Error {
  constructor() {
    super("Invalid credentials");
  }
}

module.exports = { UsernameAlreadyExist, EmailAlreadyExist, PasswordsAreNotTheSame, InvalidCredentials, UserNotFound };
