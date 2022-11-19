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

module.exports = { UsernameAlreadyExist, EmailAlreadyExist, PasswordsAreNotTheSame };
