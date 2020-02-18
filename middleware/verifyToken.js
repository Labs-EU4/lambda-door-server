const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const authorization = req.cookies.token || '';
  if (!authorization) return res.status(401).json({ error: 'No token passed' });
  try {
    const decrypt = await jwt.verify(
      authorization,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (!decrypt) return res.status(401).json('Your token is invalid');
    req.userId = decrypt.subject;
    return next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};

module.exports = verifyToken;
