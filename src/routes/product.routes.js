const { validate } = require('express-validation');
const { isAuthenticated, isAdmin } = require('../middlewares');
const { productValidations } = require('../validations');
const { productController } = require('../controllers');

const router = require('express').Router();

router.post('/', isAuthenticated, isAdmin, validate(productValidations.createValidation), productController.handleCreate);
router.get('/', productController.handleGet);

module.exports = router;
