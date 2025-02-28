import express from "express";
import { createNote, getNotes,updateNote,deleteNote } from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/update-note/:id", protect, updateNote);
router.delete("/delete-note/:id", protect, deleteNote);


export default router;
