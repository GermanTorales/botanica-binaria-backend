const router = require("express").Router();
const { logger } = require("../config");
const authRoutes = require("./auth.routes");

const endpoints = [{ base: "auth", routes: authRoutes }];

endpoints.forEach(({ base, routes }) => {
  router.use(`/${base}`, routes);

  logger.info(`${base.toUpperCase()} routes up!`);
});

module.exports = router;
