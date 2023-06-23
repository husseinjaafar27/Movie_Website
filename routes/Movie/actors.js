import express from "express";

import {
  addActor,
  getMovieActors,
} from "../../controllers/Movie/actorsController.js";

import userAuth from "../../middlewares/userAuth.js";
import isAdmin from "../../middlewares/adminAuth.js";

const router = express.Router();

router.post("/:id", userAuth, isAdmin, addActor);
router.get("/:id", userAuth, getMovieActors);

export default router;
