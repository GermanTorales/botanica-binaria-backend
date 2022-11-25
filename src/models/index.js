const User = require('./user.model');
const Product = require('./product.model');
const { Image } = require('./nested-models');

// A product has many images
Product.hasMany(Image, {
  foreignKey: 'product_id', // Field that is created automatically when saving an image in a product
  sourceKey: 'id', // Field from which the value is taken to save in the foreignKey
  as: 'images',
});

module.exports = { User, Product, Image };
