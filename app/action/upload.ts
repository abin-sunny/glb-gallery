"use server";

import { connectDB } from "@/lib/mongodb";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import Model from "@/models/model";
import { revalidatePath } from "next/cache";

export async function uploadModelAction(formData: FormData) {
  await connectDB();

  const thumbnail = formData.get("thumbnail") as File;
  const file = formData.get("file") as File;

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${uuid()}.glb`;
  const thumBytes = await thumbnail.arrayBuffer();
  const thumBuffer = Buffer.from(thumBytes);
  const filepath = path.join(process.cwd(), "public/uploads", filename);
  // if (!existsSync(uploadDir)) {
  //   mkdirSync(uploadDir, { recursive: true });
  // }
  await fs.writeFile(filepath, buffer);

  const sizeInMB = file.size / 1024;
  await Model.create({
    name: file.name.replace(".glb", ""),
    filename: file.name,
    file: buffer,
    uploadDate: new Date(),
    size: `${sizeInMB.toFixed(1)} KB`,
    thumbnail: thumBuffer,
  });
  revalidatePath("/");
}
