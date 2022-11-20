const { Sequelize } = require('sequelize');
const envVariables = require('./env-variables');

const { user, password, host, port, databaseName } = envVariables.database;

const db = new Sequelize(databaseName, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false,
});

module.exports = db;
