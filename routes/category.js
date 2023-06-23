import express from "express";

import userAuth from "../middlewares/userAuth.js";
import { createCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", userAuth, createCategory);

export default router;
