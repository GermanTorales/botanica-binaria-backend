const router = require('express').Router();
const { validate } = require('express-validation');
const { authController } = require('../controllers');
const { authValidations } = require('../validations');
const { isAuthenticated } = require('../middlewares');

router.post('/sign-up', validate(authValidations.signUpValidation, {}, {}), authController.handleSignUp);
router.post('/log-in', validate(authValidations.logInValidation, {}, {}), authController.handleLogIn);
router.get('/me', isAuthenticated, authController.handleMe);

module.exports = router;
