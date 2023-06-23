import express from "express";
import multer from "multer";

import userAuth from "../../middlewares/userAuth.js";
import isAdmin from "../../middlewares/adminAuth.js";

import {
  createEpisode,
  deleteMovie,
  editEpisode,
  episodeStatus,
  getEpisode,
  getEpisodeByFilter,
  getEpisodeSeason,
} from "../../controllers/Series/episodeController.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/episode");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "+" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/:id/:seasonId", userAuth, isAdmin, createEpisode);
router.patch(
  "/edit/:id",
  userAuth,
  isAdmin,
  upload.single("img_url"),
  editEpisode
);
router.delete("/:id", userAuth, isAdmin, deleteMovie);
router.get("/:id", getEpisode);
router.get("/season/:id", getEpisodeSeason);
router.get("/filter/search", getEpisodeByFilter);
router.patch("/status/:id", episodeStatus);

export default router;
