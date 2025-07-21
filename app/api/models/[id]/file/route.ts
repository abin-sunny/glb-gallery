import { connectDB } from "@/lib/mongodb";
import Model from "@/models/model";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();
  const model = await Model.findById(id).select("file filename");
  if (!model || !model.file)
    return new NextResponse("Not found", { status: 404 });
  return new NextResponse(
    model.file instanceof Buffer ? model.file : model.file.buffer,
    {
      headers: {
        "Content-Type": "model/gltf-binary",
        "Content-Disposition": `inline; filename="${model.filename}"`,
      },
    }
  );
}