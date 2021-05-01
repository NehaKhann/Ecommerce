import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Register User
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  const salt = await bcrypt.genSalt(10);
  let hashpassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name: name,
    email: email,
    password: hashpassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      password: user.password,
    });
  } else {
    res.status(401);
    throw new Error("Invalid User data");
  }
});
// @desc    user Profile
// @route   POST /api/users/profile
// @access  Public
//first created auth middleware where we have set protect middleware (also where we are verifying the password)
export const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  try {
    const { newpassword, password } = req.body;
    const _id = req.user._id;
    const salt = await bcrypt.genSalt(10);
    let comparedPassword = await bcrypt.compare(password, req.user.password);
    let hashPassword = await bcrypt.hash(newpassword, salt);
    if (comparedPassword) {
      await User.updateOne(
        { _id },
        {
          $set: { password: hashPassword },
        }
      );
      return res.send({
        status: true,
        message: "password Successfully Updated",
      });
    } else {
      return res.send({
        status: true,
        message: "password not matched",
      });
    }
  } catch (e) {
    console.log("Exception e", e);
    return res.send({
      status: false,
      message: e.message,
    });
  }
});
