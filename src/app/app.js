const express = require("express");
const morgan = require("morgan");
const httpStatus = require("http-status");

const router = require("../routes");
const { logger } = require("../config");

const api = async (app) => {
  logger.info("Express starting...");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  app.use("/api", router);

  app.use((req, res, next) => {
    return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: "Endpoint not found" });
  });
};

module.exports = api;
