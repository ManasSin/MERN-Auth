import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

const protectRouts = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  // * we take the token that we have send the user on signup. and verify it
  // * then we decode it to get the actual paramter we used to generate the token.
  // * then pass it to the function that need to verify if the user is legit ( protected route )
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("your not authorised");
  }
});

export { protectRouts };
