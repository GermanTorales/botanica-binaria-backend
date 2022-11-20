const httpStatus = require('http-status');

const handleHealth = (req, res) => {
  return res.status(httpStatus.OK).json({ code: httpStatus.OK, message: 'Api online' });
};

module.exports = { handleHealth };
