const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BaseException = require("../core/BaseException");

const generateJWT = (user) => {
  try {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY || "secret",
      { expiresIn: process.env.JWT_VALIDITY || "30d" }
    );
  } catch (err) {
    throw new IndulgeBaseException(err);
  }
};

const generateHash = async (password) => {
  try {
    return await bcrypt.hash(
      password,
      parseInt(process.env.PASSWORD_SALT) || 10
    );
  } catch (err) {
    throw new BaseException(err);
  }
};

const verifyHash = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new BaseException(err);
  }
};

module.exports = {
  generateJWT,
  generateHash,
  verifyHash,
};
