class NotLogin extends Error {
  constructor() {
    super('Please login to access');
  }
}

module.exports = { NotLogin };
