import { NextResponse } from "next/server";
import Model from "@/models/model";
import { connectDB } from "@/lib/mongodb";
// import { createThumbnailFromGLB } from "@/lib/server-thumbnail";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const thumbnail=formData.get("thumbnail") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer(); // ✅ Convert File to Buffer
  const buffer = Buffer.from(bytes);
  const thumBytes=await thumbnail.arrayBuffer();
  const thumBuffer=Buffer.from(thumBytes);
  // const thumbnailBuffer = await createThumbnailFromGLB(fileBuffer);

  //   let thumbnailBuffer: Buffer | null = null;

  //  try {
  //       const { createThumbnailFromGLB } = await import("@/lib/server-thumbnail");
  //       thumbnailBuffer = await createThumbnailFromGLB(buffer);
  //       console.log(thumbnailBuffer+"kjkjkjkjkjkjkjk")
  //     } catch (thumbErr) {
  //       console.error("❌ Thumbnail generation failed:", thumbErr);
  //     }
  //  const thumbnailBuffer = await createThumbnailFromGLB(buffer);
  await connectDB();
  const sizeInMB = file.size / 1024; // More reliable
  const modelDoc = await Model.create({
    name: file.name.replace(".glb", ""),
    filename: file.name,
    // modelUrl: `/uploads/${uniqueName}`,
    file: buffer,
    uploadDate: new Date(),
    size: `${sizeInMB.toFixed(1)} KB`,
    thumbnail: thumBuffer,
  });
  console.log("Saved saved model:", modelDoc);

  return NextResponse.json(modelDoc, { status: 201 });
}
