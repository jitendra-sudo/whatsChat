import suggestionModel from "../Model/suggestionModel.js";
import { broadcast } from "../../utils/wsServer.js";


export const getSearch = async (req, res) => {
  try {
    const q = req.query.q || "";
    const results = await suggestionModel.find({
      name: { $regex: q, $options: "i" }
    }).limit(10);

    res.status(200).json({
      message: "Query Searched Successfully",
      data: results
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addSuggestion = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "name is required" });

    const newItem = await suggestionModel.create({ name });

    broadcast({
      type: "new_suggestion",
      payload: newItem
    });

    res.status(201).json({
      message: "Suggestion Added Successfully",
      data: newItem
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
