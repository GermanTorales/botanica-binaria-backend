const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const httpStatus = require('http-status');
const { ValidationError } = require('express-validation');

const router = require('../routes');
const { logger } = require('../config');

const api = async app => {
  logger.info('Express starting...');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.use(cors({ origin: '*', optionsSuccessStatus: 200, methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));

  app.use('/api', router);

  app.use((req, res, next) => {
    return res
      .status(httpStatus.NOT_FOUND)
      .json({ code: httpStatus.NOT_FOUND, message: `Endpoint ${req.method.toUpperCase()} ${req?.url} not found` });
  });

  app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
  });
};

module.exports = api;
