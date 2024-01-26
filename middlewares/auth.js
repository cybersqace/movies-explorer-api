const jwt = require('jsonwebtoken');
const UnathorizedError = require('../errors/UnathorizedError');

const { NODE_ENV, JWT_SECRET } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnathorizedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnathorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
