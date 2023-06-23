import express from "express";
import {
  activateUser,
  changePassword,
  forgetPassword,
  logOut,
  login,
  registerUser,
  validateResetCode,
} from "../controllers/authController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/create_user", (req, res, next) =>
  registerUser(req, res, next, 2)
);
router.post("/create_admin", (req, res, next) =>
  registerUser(req, res, next, 1)
);
router.patch("/activate", activateUser);
router.post("/login", login);
router.patch("/logout", userAuth, logOut);
router.post("/forgetPassword", forgetPassword);
router.post("/validatePassword", validateResetCode);
router.patch("/changePassword", changePassword);

export default router;
