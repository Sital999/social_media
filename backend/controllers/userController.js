const { db } = require("../model");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const User = db.user;

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const user = await User.findOne({ where: { email } });

  // using bcrypt means asynchronous
  // and inside order should be same order first posted password and then user's password
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  }

  res.status(400);
  throw new Error("Invalid credentials");
});

// resgister
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ msg: "please provide all fields" });
  }

  // checking if user is already registered
  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400).json({ msg: "User already registered" });
  }

  // generating salt
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // creating user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user.id);

  if (user) {
    res.status(200).json({
      user: {
        _id: user.id,
        name,
        email,
        password,
        token,
      },
    });
  }
});

// user's list
const userData = asyncHandler(async (req, res) => {
  const user = await User.findAll({});
  res.status(200).json({ users: user, id: req.userID });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = { login, register, userData };
