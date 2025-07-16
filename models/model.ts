// models/model.ts
import mongoose from "mongoose";

const modelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    filename: { type: String }, // ✅ ADD THIS
    modelUrl: { type: String }, // ✅ ADD THIS
    file: { type: Buffer },
    uploadDate: { type: Date },
    size: { type: String ,required:true},
    thumbnail: { type: Buffer },
  },
  { timestamps: true }
);

// ✅ Always use "Model" (capital M) in .model()
export default mongoose.models.Model || mongoose.model("Model", modelSchema);
