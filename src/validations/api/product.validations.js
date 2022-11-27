const Joi = require('joi');

const createValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    sku: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().default(0),
    description: Joi.string(),
    status: Joi.string()
      .valid(...['active', 'inactive'])
      .default('inactive'),
    images: Joi.array().items(Joi.string()),
  }),
};

const updateValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    price: Joi.number().required().greater(0),
    stock: Joi.number().required().greater(0),
    description: Joi.string().required(),
    status: Joi.string()
      .valid(...['active', 'inactive', 'deleted'])
      .required(),
  }),
  params: Joi.object().keys({ sku: Joi.string().required() }),
};

const getByFiltersValidation = {
  query: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    minStock: Joi.number(),
    maxStock: Joi.number(),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
    status: Joi.string().valid(...['active', 'inactive', 'deleted']),
  }),
};

const addImgValidation = {
  params: Joi.object().keys({
    sku: Joi.string().required(),
  }),
  body: Joi.object().keys({
    url: Joi.string().required(),
  }),
};

module.exports = { createValidation, updateValidation, getByFiltersValidation, addImgValidation };
