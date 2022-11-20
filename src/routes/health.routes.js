const router = require('express').Router();
const { healthController } = require('../controllers');

router.get('/', healthController.handleHealth);

module.exports = router;
