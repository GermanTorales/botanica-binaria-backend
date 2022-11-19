const router = require("express").Router();
const { validate } = require("express-validation");
const { authController } = require("../controllers");
const { authValidations } = require("../validations");

router.post("/sign-up", validate(authValidations.signUpValidation, {}, {}), authController.handleSignUp);

router.post("/log-in");

module.exports = router;
