import express from "express";

import {
  editSeason,
  getSeasonsMovies,
} from "../../controllers/Movie/SeasonController.js";

import userAuth from "../../middlewares/userAuth.js";
import isAdmin from "../../middlewares/adminAuth.js";

const router = express.Router();

router.patch("/edit/:id", userAuth, isAdmin, editSeason);
router.get("/:id", userAuth, isAdmin, getSeasonsMovies);

export default router;
