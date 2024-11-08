const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const errorHandler = require("../middleware/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//@desc Register a user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(404).json("all inputs are required");
  }

  const availableUser = await User.findOne({ email });
  if (!availableUser) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    const { password, ...others } = user._doc;
    res.json({ msg: "Register the user", others });
  }
  res.status(400).json({ msg: "user already registered", availableUser });
});

//@desc login a user
//@route Post /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const user = await User.findOne({ email });
  //compare password
  //const validPassword= await bcrypt.compare(req.body.password, user.password)

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({accessToken});
  } else {
    res.status(401);
    throw new Error("email or password is invalid");
  }
});

//@desc currentUser info
//@route Post/api/currentUser
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ msg: "current user information" ,user: req.user});
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
