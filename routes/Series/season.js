import express from "express";
import multer from "multer";

import {
  createSeason,
  deleteSeason,
  editSeason,
  getSeason,
  getSeasonsSeries,
} from "../../controllers/Series/SeasonController.js";

import userAuth from "../../middlewares/userAuth.js";
import isAdmin from "../../middlewares/adminAuth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/season");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "+" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/:id", userAuth, isAdmin, createSeason);
router.patch("/:id", userAuth, isAdmin, upload.single("img_url"), editSeason);
router.delete("/:id", userAuth, isAdmin, deleteSeason);
router.get("/series/:id", getSeasonsSeries);
router.get("/:id", getSeason);

export default router;
