import { connectDB } from "@/lib/mongodb";
import Model from "@/models/model";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await connectDB();

  const model = await Model.findById(id).select("thumbnail");
  if (!model || !model.thumbnail) {
    return new NextResponse("Thumbnail not found", { status: 404 });
  }

  return new NextResponse(model.thumbnail, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `inline; filename="thumbnail.png"`,
    },
  });
}