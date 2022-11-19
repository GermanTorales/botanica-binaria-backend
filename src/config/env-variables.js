const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.string().default(3000),
    PG_USER: Joi.string().required(),
    PG_PASSWORD: Joi.string().required(),
    PG_HOST: Joi.string().required(),
    PG_PORT: Joi.string().required(),
    PG_DATABASE: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) throw new Error(`Environment variables validation error: ${error?.message}`);

const envVariables = {
  port: envVars.PORT,
  database: {
    user: envVars.PG_USER,
    password: envVars.PG_PASSWORD,
    host: envVars.PG_HOST,
    port: envVars.PG_PORT,
    databaseName: envVars.PG_DATABASE,
  },
};

module.exports = envVariables;
