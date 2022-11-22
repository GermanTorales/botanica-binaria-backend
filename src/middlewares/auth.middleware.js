const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { envVariables } = require('../config');
const { authExceptions } = require('../exceptions');

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');

    if (!token) throw new authExceptions.NotLogin();

    const { secret } = envVariables.jwt;
    const { id, username } = await jwt.verify(token, secret);

    req.user = { id, username };

    next();
  } catch (error) {
    if (error?.name === 'TokenExpiredError')
      return res.status(httpStatus.UNAUTHORIZED).json({ code: httpStatus.UNAUTHORIZED, message: error?.message });

    if (error instanceof authExceptions.NotLogin)
      return res.status(httpStatus.UNAUTHORIZED).json({ code: httpStatus.UNAUTHORIZED, message: error?.message });

    return next(error);
  }
};

module.exports = isAuthenticated;
