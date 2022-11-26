class SkuAlreadyExist extends Error {
  constructor(message, key) {
    super(message);

    this.key = key;
  }
}

class NotFound extends Error {
  constructor(query) {
    super(`Product ${JSON.stringify(query)} not found.`);
  }
}

module.exports = { SkuAlreadyExist, NotFound };
