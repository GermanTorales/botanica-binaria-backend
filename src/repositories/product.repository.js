const BaseRepository = require('./base.repository');
const { Product, Image } = require('../models');
const { productExceptions } = require('../exceptions');
const { Op } = require('sequelize');

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

  async findProducts(filters) {
    const query = this._buildFilter(filters);
    const include = [{ model: Image, as: 'images', attributes: ['url', 'id'] }];
    const attributes = ['id', 'sku', 'title', 'price', 'stock', 'description'];

    return await this.get({ include, attributes, query });
  }

  async findProduct(sku) {
    const query = { sku };
    const include = [{ model: Image, as: 'images', attributes: ['url', 'id'] }];
    const attributes = ['id', 'sku', 'title', 'price', 'stock', 'description'];

    return await this.get({ query, include, attributes });
  }

  async updateProduct({ sku, productData }) {
    const query = { sku };

    const [productUpdated] = await this.update({ query, data: productData });

    if (!productUpdated) throw new productExceptions.NotFound(query);

    return productData;
  }

  async deleteProduct(sku) {
    const query = { sku };

    const productDeleted = await this.delete({ query });

    if (!productDeleted) throw new productExceptions.NotFound(query);

    return productDeleted;
  }

  _buildFilter(filters) {
    const where = Object.entries(filters).reduce((where, [key, value]) => {
      if (key === 'title' || key === 'description') {
        where = { ...where, [key]: { [Op.iLike]: `%${value}%` } };
      }

      if (key === 'minPrice') {
        if (where?.price) where = { ...where, price: { ...where.price, [Op.gte]: value } };
        else where = { ...where, price: { [Op.gte]: value } };
      }

      if (key === 'maxPrice') {
        if (where?.price) where = { ...where, price: { ...where.price, [Op.lte]: value } };
        else where = { ...where, price: { [Op.lte]: value } };
      }

      if (key === 'minStock') {
        if (where?.stock) where = { ...where, stock: { ...where.stock, [Op.gte]: value } };
        else where = { ...where, stock: { [Op.gte]: value } };
      }

      if (key === 'maxStock') {
        if (where?.stock) where = { ...where, stock: { ...where.stock, [Op.lte]: value } };
        else where = { ...where, stock: { [Op.lte]: value } };
      }

      if (key === 'status') where = { ...where, status: value };

      return where;
    }, {});

    return where;
  }
}

const productRepository = new ProductRepository(Product);

module.exports = productRepository;
