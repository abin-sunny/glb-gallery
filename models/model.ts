import mongoose from "mongoose";

const modelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    filename: { type: String },
    modelUrl: { type: String },
    file: { type: Buffer },
    uploadDate: { type: Date },
    size: { type: String, required: true },
    thumbnail: { type: Buffer },
  },
  { timestamps: true }
);

export default mongoose.models.Model || mongoose.model("Model", modelSchema);
