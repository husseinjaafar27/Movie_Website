import express from "express";
import multer from "multer";

import {
  createSeries,
  deleteSeries,
  editSeries,
  getAllSeries,
  getSeries,
  getSeriesByCategory,
} from "../../controllers/Series/seriesController.js";

import userAuth from "../../middlewares/userAuth.js";
import isAdmin from "../../middlewares/adminAuth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/series");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "+" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/:id", userAuth, isAdmin, createSeries);
router.patch("/:id", userAuth, isAdmin, upload.single("img_url"), editSeries);
router.delete("/:id", userAuth, isAdmin, deleteSeries);
router.get("/:id", getSeries);
router.get("/", getAllSeries);
router.get("/filter/search", getSeriesByCategory);

export default router;
