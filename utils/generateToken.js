const jwt = require('jsonwebtoken');

const generateToken = (res, id, fullName) => {
  const payload = {
    subject: id,
    fullName: fullName,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return res.cookie('token', token, {
    expires: new Date(Date.now() + 604800000),
    secure: false,
    httpOnly: true,
  });
};

module.exports = generateToken;
