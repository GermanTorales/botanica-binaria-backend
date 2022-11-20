const router = require('express').Router();
const authRoutes = require('./auth.routes');
const healthRoutes = require('./health.routes');

router.use(`/auth`, authRoutes);
router.use(`/health`, healthRoutes);

module.exports = router;
