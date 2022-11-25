const { Image } = require('../models');
const BaseRepository = require('./base.repository');

class ImageRepository extends BaseRepository {
  async addImage(image, productId) {
    const data = { url: image, product_id: productId };

    return await this.create(data);
  }
}

const imageRepository = new ImageRepository(Image);

module.exports = imageRepository;
