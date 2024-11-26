import express from "express";
import Home from "../controllers/home_controller.js";
const router = express.Router();

// Goi ham
router.get("/", Home.home);
router.get("/about", Home.about);

export default router;