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

const logInValidation = {
  body: Joi.object()
    .keys({
      username: Joi.string().lowercase(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .lowercase(),
      password: Joi.string().required(),
    })
    .xor("username", "email"),
};

module.exports = { signUpValidation, logInValidation };
