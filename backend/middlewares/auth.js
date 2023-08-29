const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError('Необходима авторезация');
  }
  console.log('Received token:', token);
  let payload;
  try {
    console.log('Trying to verify token...');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-key');
    console.log('Payload after verification:', payload);
  } catch (err) {
    console.log('Verification failed with error:', err);
    next(new UnauthorizedError('Необходима авторезация'));
    return;
  }
  req.user = payload;
  next();
};
