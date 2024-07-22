const jwt = require('jsonwebtoken');
require('dotenv').config();

function authMiddleware(req, res, next) {
  const bearerToken = req.headers['authorization'];
  const token = bearerToken.split(' ')[1];
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedToken) {
      return res.status(401).json({
        message: 'Failed to verify the token',
      });
    }
    if (verifiedToken.userId) {
      req.userId = verifiedToken.userId;
      next();
    } else {
      return res.status(401).json({
        message: 'user Id not found while verifying token',
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Failed verification with given token',
    });
  }
}

module.exports = authMiddleware;
