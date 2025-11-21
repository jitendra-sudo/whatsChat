import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model("Suggestion", suggestionSchema);
