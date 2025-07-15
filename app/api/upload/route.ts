import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import Model from "@/models/model";
import { v4 as uuid } from "uuid";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer(); // ✅ Convert File to Buffer
  const buffer = Buffer.from(bytes);

  // const uploadDir = path.join(process.cwd(), "public", "uploads");
  // const uniqueName = `${uuid()}-${file.name}`;
  // const filePath = path.join(uploadDir, uniqueName);

  // await writeFile(filePath, buffer); // ✅ Save to filesystem

  await connectDB();
const sizeInMB = file.size / (1024); // More reliable
  const modelDoc = await Model.create({
    name: file.name.replace(".glb", ""),
    filename: file.name,
    // modelUrl: `/uploads/${uniqueName}`,
    file: buffer,
    uploadDate: new Date(),
    size: `${sizeInMB.toFixed(1)} KB`,
    thumbnail: "/placeholder.svg",
  });
  console.log("Saved saved model:", modelDoc);

  return NextResponse.json(modelDoc, { status: 201 });
}
