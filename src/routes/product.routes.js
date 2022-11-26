const { validate } = require('express-validation');
const { isAuthenticated, isAdmin } = require('../middlewares');
const { productValidations } = require('../validations');
const { productController } = require('../controllers');

const router = require('express').Router();

router.get('/', productController.handleGet);
router.post('/', isAuthenticated, isAdmin, validate(productValidations.createValidation, {}, {}), productController.handleCreate);
router.put('/:sku', isAuthenticated, isAdmin, validate(productValidations.updateValidation, {}, {}), productController.handleUpdate);

module.exports = router;
