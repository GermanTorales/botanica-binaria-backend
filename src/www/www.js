const express = require('express');
const api = require('../app/app');
const { envVariables, logger, db } = require('../config');

const app = express();

const runServer = async () => {
  await api(app);

  const { port } = envVariables;

  try {
    await db.sync({ force: false });

    logger.info('Database is connected');

    app.listen(port, () => logger.info(`Express server on port ${port}`));
  } catch (error) {
    logger.error(error?.message);

    process.exit(1);
  }
};

runServer();
