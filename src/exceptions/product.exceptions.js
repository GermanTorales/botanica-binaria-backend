class SkuAlreadyExist extends Error {
  constructor(message, key) {
    super(message);

    this.key = key;
  }
}

module.exports = { SkuAlreadyExist };
