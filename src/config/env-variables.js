const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.string().default(3000),
    ENV: Joi.string().default('local'),
    PG_USER: Joi.string().required(),
    PG_PASSWORD: Joi.string().required(),
    PG_HOST: Joi.string().required(),
    PG_PORT: Joi.string().required(),
    PG_DATABASE: Joi.string().required(),
    HASH_SALT_ROUNDS: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) throw new Error(`Environment variables validation error: ${error?.message}`);

const envVariables = {
  port: envVars.PORT,
  env: envVars.ENV,
  database: {
    user: envVars.PG_USER,
    password: envVars.PG_PASSWORD,
    host: envVars.PG_HOST,
    port: envVars.PG_PORT,
    databaseName: envVars.PG_DATABASE,
  },
  hash: {
    saltRounds: parseInt(envVars.HASH_SALT_ROUNDS),
  },
  jwtKey: envVars.JWT_SECRET_KEY,
};

module.exports = envVariables;
