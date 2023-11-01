import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateJWTToken from "../utils/generateToken.js";

// @desc Auth user/set token
// route POST  /api/users/auth
// @access Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("email doesnot exists");
  }

  if (user && (await user.matchPassword(password))) {
    generateJWTToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: user.address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc resgister user
// route POST  /api/users
// @access Public

export const resgisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address, website } = req.body;
  console.log(name, email, password, phone, address, website);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
    website,
  });

  console.log(user);

  if (user) {
    generateJWTToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: user.address,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc logout user
// route POST  /api/users/logout
// @access Public

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc get user profile
// route POST  /api/users/profile
// @access Privet

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    phone: requser.phone,
    website: requser.website,
    address: requser.address,
  };

  res.status(200).json(user);
});

// @desc Update user profile
// route PUT  /api/users/profile
// @access Privet

export const updateUserProfiel = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const {
      email: newEmail,
      name: newName,
      password: changedPassword,
      phone: newPhone,
      website: newWebsite,
      address: newAddress,
    } = req.body;

    user.name = newName || user.name;
    user.email = newEmail || user.email;
    user.phone = newPhone || user.phone;
    user.address = newAddress || user.address;
    user.website = newWebsite || user.website;

    if (changedPassword) {
      user.password = changedPassword;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      website: updatedUser.website,
      address: updatedUser.address,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
