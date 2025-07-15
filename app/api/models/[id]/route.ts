import { NextRequest, NextResponse } from "next/server";
import Model from "@/models/model";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const model = await Model.findById(params.id).lean();

  if (!model) {
    return NextResponse.json({ error: "Model not found" }, { status: 404 });
  }

     return NextResponse.json(model);

}
