const router = require('express').Router();
const authRoutes = require('./auth.routes');
const healthRoutes = require('./health.routes');
const productRoutes = require('./product.routes');

router.use(`/auth`, authRoutes);
router.use(`/health`, healthRoutes);
router.use(`/products`, productRoutes);

module.exports = router;
