const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  registerUser,
  userLogin,
} = require("../controllers/auth");

router.post(
  "/register",
  [
    check(
      "password",
      "Please enter password that contains 6 or more characters"
    ).isLength({ min: 6 }),
    check("email", "Enter Valid Email").isEmail(),
  ],

  registerUser
);

router.post(
  "/signin",
  [
    check("email", "Enter Valid Email").isEmail(),
    check(
      "password",
      "Please enter password that contains 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userLogin
);



module.exports = router;
