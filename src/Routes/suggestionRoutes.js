import express from "express";
import { addSuggestion, getSearch } from "../Controller/suggestionController.js";
const router = express.Router();

router.get("/search", getSearch);
router.post("/add", addSuggestion);

export default router;