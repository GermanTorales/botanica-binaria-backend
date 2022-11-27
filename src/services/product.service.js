const { productRepository, imageRepository } = require('../repositories');

const create = async newProductData => {
  const { images, ...productData } = newProductData;
  const productCreated = await productRepository.createProduct(productData);

  if (images?.length) {
    const imagesPromises = images.map(image => imageRepository.addImage(image, productCreated.id));

    await Promise.all(imagesPromises);
  }

  return productCreated;
};

const findAll = async () => {
  return await productRepository.findProducts();
};

const update = async ({ sku, updateData }) => {
  return await productRepository.updateProduct({ sku, productData: updateData });
};

const deleteProduct = async sku => {
  return await productRepository.deleteProduct(sku);
};

module.exports = { create, findAll, update, deleteProduct };
