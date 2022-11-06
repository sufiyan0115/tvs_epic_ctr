const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../utils/auth");
const ExceptionHandler = require("../core/ExceptionHandler");
const ValidationException = require("../exceptions/ValidationException");

router.post("/register", async (req, res) => {
  try {
    const { password } = req.body;
    if (!password)
      throw new ValidationException({ message: "Password is missing" });
    const hash = await auth.generateHash(password);
    req.body.password = hash;
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ValidationException({
        message: "Invalid email or password",
      });
    }
    const result = await auth.verifyHash(password, user.password);
    if (result) {
      res.send({
        token: auth.generateJWT(user),
        user: user,
      });
    } else {
      throw new ValidationException({
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    const e = ExceptionHandler(err);
    res.status(e.code).json(e);
  }
});

module.exports = router;
