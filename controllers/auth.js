const { validationResult } = require("express-validator");
const User = require("../models/User");
const generateToken = require("../utils/jwt");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "577210671376-f8jma6jbeh2ise31rgp23jv42hfmbpgg.apps.googleusercontent.com"
);
//POST        @REGISTER USER
//API         @  '/register '

const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }
    const { email, password } = req.body;
    let findUser = await User.findOne({ email });
    if (findUser) {
      return res
        .status(400)
        .json({ success: false, msg: "Email already exist" });
    }
    let user = new User({
      email,
      password,
      role: "admin",
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = await generateToken(payload, req, res);

    res.status(201).json({ success: true, msg: "Successfully registered!" });
    // job.start();
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//POST        @LOGIN USER
//API         @  '/signin'

const userLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: errors.array() });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "Invalid Credentials !" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    const token = await generateToken(payload);
    const loginUser = await User.findOne({ email }).select("-password");
    res.status(200).json({ success: true, loginUser, token });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



module.exports = {
  registerUser,
  userLogin,
};
