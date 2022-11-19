const httpStatus = require("http-status");

const { authService } = require("../services");
const { userExceptions } = require("../exceptions");

const handleSignUp = async (req, res, next) => {
  try {
    const signUpData = req.body;

    await authService.signUp(signUpData);

    return res.status(httpStatus.CREATED).json({ code: httpStatus.CREATED, message: "User created" });
  } catch (error) {
    if (error instanceof userExceptions.UsernameAlreadyExist || error instanceof userExceptions.EmailAlreadyExist)
      return res.status(httpStatus.BAD_REQUEST).json({ code: httpStatus.BAD_REQUEST, message: error?.message, key: error?.key });

    if (error instanceof userExceptions.PasswordsAreNotTheSame)
      return res.status(httpStatus.BAD_REQUEST).json({ code: httpStatus.BAD_REQUEST, message: error?.message });

    next(error);
  }
};

module.exports = { handleSignUp };
