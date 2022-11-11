const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BaseException = require("../core/BaseException");
const BadRequestException = require("../exceptions/BadRequestException");
const ExceptionHandler = require("../core/ExceptionHandler");
const UnauthorisedException = require("../exceptions/UnauthorisedException");

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
    throw new BaseException(err);
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
const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY || "secret");
  } catch (err) {
    throw new BaseException(err);
  }
};
const authenticate = async function (req, res, next) {
  try {
    let token = req.get("Authorization") || req.get("Authorisation");
    if (!token || (typeof token === "string" && token.length === 0)) {
      throw new UnauthorisedException({ message: "No token provided" });
    }
    token = token.replace("Bearer ", "");
    let decoded;
    try {
      decoded = verifyJWT(token);
    } catch (err) {
      throw new BadRequestException({ message: "Invalid JWT supplied" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new UnauthorisedException({ message: "User not found!" });
    }
    req.user = user;
    if (req.user) {
      next();
    } else {
      throw new UnauthorisedException({
        message: "Unauthorized because of credential error or server error",
      });
    }
  } catch (err) {
    if (!(err instanceof Error)) err = new UnauthorisedException({});
    err = ExceptionHandler(err);
    res.status(err.code).json(err);
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new UnauthorisedException({ message: "Unauthorised user" });
    }
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
};
module.exports = {
  generateJWT,
  generateHash,
  verifyHash,
  authenticate,
  verifyAdmin,
};
