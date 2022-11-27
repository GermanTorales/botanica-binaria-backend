const { faker } = require('@faker-js/faker');
const { Product, Image } = require('../src/models');

const productsArray = () => {
  return [...new Array(50)].map(() => {
    return {
      id: faker.datatype.uuid(),
      sku: `PL${faker.datatype.number({ max: 99999 })}`,
      title: faker.commerce.productName(),
      price: faker.datatype.number({ max: 99999, precision: 0.01 }),
      stock: faker.datatype.number({ max: 9999 }),
      description: faker.commerce.productDescription(),
      status: ['active', 'inactive', 'deleted'][faker.datatype.number({ min: 0, max: 2 })],
    };
  });
};

const getImage = () => {
  return {
    id: faker.datatype.uuid(),
    url: faker.image.nature(),
  };
};

const seedProductsInDb = async () => {
  const products = productsArray();

  try {
    const productsCreated = await Product.bulkCreate(products);

    const images = await productsCreated.map(product => {
      const image = getImage();

      return { ...image, product_id: product.id };
    });

    await Image.bulkCreate(images);
  } catch (error) {
    console.log(error);
  }
};

seedProductsInDb();
