const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const { envVariables } = require('../config');
const { USER_ROLES } = require('../constants');
const { authExceptions } = require('../exceptions');

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new authExceptions.TokenNotFound();

    const [, token] = authorization.split(' ');

    if (!token) throw new authExceptions.NotLogin();

    const { secret } = envVariables.jwt;
    const { id, username, role } = await jwt.verify(token, secret);

    req.user = { id, username, role };

    next();
  } catch (error) {
    if (error?.name === 'TokenExpiredError')
      return res.status(httpStatus.UNAUTHORIZED).json({ code: httpStatus.UNAUTHORIZED, message: error?.message });

    if (error instanceof authExceptions.NotLogin || error instanceof authExceptions.TokenNotFound)
      return res.status(httpStatus.UNAUTHORIZED).json({ code: httpStatus.UNAUTHORIZED, message: error?.message });

    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== USER_ROLES.ADMIN) throw new authExceptions.NotAdmin(role);

    next();
  } catch (error) {
    if (error instanceof authExceptions.NotAdmin)
      return res.status(httpStatus.UNAUTHORIZED).json({ code: httpStatus.UNAUTHORIZED, message: error?.message });

    return next(error);
  }
};

module.exports = { isAuthenticated, isAdmin };
