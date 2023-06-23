import express from "express";

import {
  addFeature,
  getMovieFeatures,
} from "../../controllers/Movie/featureController.js";

import userAuth from "../../middlewares/userAuth.js";
import isAdmin from "../../middlewares/adminAuth.js";

const router = express.Router();

router.post("/:id", userAuth, isAdmin, addFeature);
router.get("/:id", userAuth, getMovieFeatures);

export default router;
