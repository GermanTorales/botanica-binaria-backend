const { validate } = require('express-validation');
const { isAuthenticated, isAdmin } = require('../middlewares');
const { productValidations } = require('../validations');
const { productController } = require('../controllers');

const router = require('express').Router();

router.get('/', validate(productValidations.getByFiltersValidation), productController.handleGet);
router.get('/:sku', productController.handleGetOne);
router.post('/', isAuthenticated, isAdmin, validate(productValidations.createValidation), productController.handleCreate);
router.put('/:sku', isAuthenticated, isAdmin, validate(productValidations.updateValidation), productController.handleUpdate);
router.delete('/:sku', isAuthenticated, isAdmin, productController.handleDelete);
router.post('/:sku/images', isAuthenticated, isAdmin, validate(productValidations.addImgValidation), productController.handleAddImage);

router.delete(
  '/:sku/images/:id',
  isAuthenticated,
  isAdmin,
  validate(productValidations.deleteImgValidation),
  productController.handleDeleteImage
);

module.exports = router;
