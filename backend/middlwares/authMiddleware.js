const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'certi');
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};