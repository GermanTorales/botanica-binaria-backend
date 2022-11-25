const Joi = require('joi');

const createValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    sku: Joi.string().required(),
    price: Joi.string().required(),
    stock: Joi.number().default(0),
    description: Joi.string(),
    status: Joi.string()
      .valid(...['active', 'inactive'])
      .default('inactive'),
    images: Joi.array().items(Joi.string()),
  }),
};

module.exports = { createValidation };
