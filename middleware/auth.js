/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const [authType, token] = authHeader.split(' '); // Authorization: Bearer
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  jwt.verify(token, 'secretkey', (err, decodedToken) => {
    if (!decodedToken) {
      req.isAuth = false;
      return next();
    }
    if (err) {
      console.log('err', err);
      throw err;
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
  });
}
