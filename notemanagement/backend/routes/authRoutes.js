import express from "express";
import { register, login,updateProfile } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", updateProfile);

export default router;
