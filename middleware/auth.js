const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get the token from the headers
  const token = req.header('x-auth-token');

  // Check if token doesn't exists, if not, return an unauthorized status code
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};
