const BaseRepository = require('./base.repository');
const { Product, Image } = require('../models');
const { productExceptions } = require('../exceptions');

class ProductRepository extends BaseRepository {
  async createProduct(productData) {
    try {
      return await this.create(productData);
    } catch (error) {
      if (error?.name === 'SequelizeUniqueConstraintError') {
        const { detail } = error.parent;
        const [[key]] = Object.entries(error?.fields);

        throw new productExceptions.SkuAlreadyExist(detail, key);
      }

      throw error;
    }
  }

  async findProducts() {
    const include = [{ model: Image, as: 'images', attributes: ['url', 'id'] }];
    const attributes = ['id', 'sku', 'title', 'price', 'stock', 'description'];

    return await this.get({ include, attributes });
  }

  async updateProduct({ sku, productData }) {
    const query = { sku };

    const [productUpdated] = await this.update({ query, data: productData });

    if (!productUpdated) throw new productExceptions.NotFound(query);

    return productData;
  }
}

const productRepository = new ProductRepository(Product);

module.exports = productRepository;
