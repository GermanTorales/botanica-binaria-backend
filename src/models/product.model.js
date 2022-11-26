const { Model, DataTypes } = require('sequelize');
const { db } = require('../config');
const { PRODUCT_STATUS } = require('../constants');

class Product extends Model {}

Product.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    sku: { type: DataTypes.STRING, unique: true },
    title: { type: DataTypes.STRING, require: true },
    price: { type: DataTypes.DECIMAL(10, 2), require: true },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    description: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM, defaultValue: PRODUCT_STATUS.INACTIVE, values: Object.values(PRODUCT_STATUS) },
  },
  { sequelize: db, modelName: 'product' }
);

module.exports = Product;
