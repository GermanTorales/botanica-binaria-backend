const winston = require("winston");
const envVariables = require("./env-variables");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    envVariables.env === "local" ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${new Date().toISOString()} | ${level} | ${message}`)
  ),
  transports: [new winston.transports.Console({ stderrLevels: ["error"] })],
});

module.exports = logger;
