const httpStatus = require('http-status');

const { productExceptions } = require('../exceptions');
const { productService } = require('../services');

const handleCreate = async (req, res, next) => {
  try {
    const newProductData = req.body;

    await productService.create(newProductData);

    return res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: 'New product created' });
  } catch (error) {
    if (error instanceof productExceptions.SkuAlreadyExist)
      return res.status(httpStatus.BAD_REQUEST).json({ code: httpStatus.BAD_REQUEST, message: error?.message, key: error?.key });

    next(error);
  }
};

const handleGet = async (req, res, next) => {
  try {
    const filters = req.query;

    const products = await productService.findAll(filters);

    return res.status(httpStatus.OK).json({ code: httpStatus.OK, data: products });
  } catch (error) {
    next(error);
  }
};

const handleGetOne = async (req, res, next) => {
  try {
    const { sku } = req.params;

    const product = await productService.findOne(sku);

    return res.status(httpStatus.OK).json({ code: httpStatus.OK, data: product });
  } catch (error) {
    next(error);
  }
};

const handleUpdate = async (req, res, next) => {
  try {
    const { sku } = req.params;
    const updateData = req.body;

    await productService.update({ sku, updateData });

    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: `Product SKU:${sku} updated.` });
  } catch (error) {
    if (error instanceof productExceptions.NotFound)
      return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: error?.message });

    next(error);
  }
};

const handleDelete = async (req, res, next) => {
  try {
    const { sku } = req.params;

    await productService.deleteProduct(sku);

    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: `Product with sku ${sku} was deleted` });
  } catch (error) {
    if (error instanceof productExceptions.NotFound)
      return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: error?.message });

    next(error);
  }
};

const handleAddImage = async (req, res, next) => {
  try {
    const { sku } = req.params;
    const { url } = req.body;

    await productService.addImage(sku, url);

    return res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: `New image added to product ${sku}` });
  } catch (error) {
    if (error instanceof productExceptions.NotFound)
      return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: error?.message });

    next(error);
  }
};

const handleDeleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productService.deleteImage(id);

    return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: `Image deleted ${id}` });
  } catch (error) {
    if (error instanceof productExceptions.NotFound)
      return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: error?.message });

    next(error);
  }
};

module.exports = { handleCreate, handleGet, handleUpdate, handleDelete, handleGetOne, handleAddImage, handleDeleteImage };
