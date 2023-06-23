import express from "express";

import {
  addFeature,
  getSeasonFeatures,
} from "../../controllers/Series/featureController.js";

import userAuth from "../../middlewares/userAuth.js";
import isAdmin from "../../middlewares/adminAuth.js";

const router = express.Router();

router.post("/:id", userAuth, isAdmin, addFeature);
router.get("/:id", userAuth, getSeasonFeatures);

export default router;
