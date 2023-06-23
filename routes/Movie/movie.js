import express from "express";
import multer from "multer";

import {
  createMovie,
  deleteMovie,
  editMovie,
  getAllMovies,
  getMovie,
  getMoviesByFilter,
  movieStatus,
} from "../../controllers/Movie/movieController.js";

import userAuth from "../../middlewares/userAuth.js";
import isAdmin from "../../middlewares/adminAuth.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/movie");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "+" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/:id", userAuth, isAdmin, createMovie);
router.patch(
  "/edit/:id",
  userAuth,
  isAdmin,
  upload.single("img_url"),
  editMovie
);
router.delete("/:id", userAuth, isAdmin, deleteMovie);
router.get("/:id", getMovie);
router.get("/", getAllMovies);
router.get("/filter", getMoviesByFilter);
router.patch("/status", movieStatus);

export default router;
