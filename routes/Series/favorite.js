import express from "express";

import {
  addRemoveFavorite,
  getAllUserFavorite,
  getFavorite,
} from "../../controllers/Series/favoriteController.js";

import userAuth from "../../middlewares/userAuth.js";

const router = express.Router();

router.post("/:id", userAuth, addRemoveFavorite);
router.get("/:id", userAuth, getFavorite);
router.get("/get/all", userAuth, getAllUserFavorite);

export default router;
