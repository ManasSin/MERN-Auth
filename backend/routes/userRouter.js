import express from "express";
import {
  authUser,
  getUserProfile,
  logoutUser,
  resgisterUser,
  updateUserProfiel,
} from "../controllers/userController.js";
import { protectRouts } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", resgisterUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protectRouts, getUserProfile)
  .put(protectRouts, updateUserProfiel);

export default router;
