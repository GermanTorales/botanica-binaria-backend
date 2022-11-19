const { Joi } = require("express-validation");

const signUpValidation = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required(),
  }),
};

module.exports = { signUpValidation };
