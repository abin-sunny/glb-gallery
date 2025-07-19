import { NextResponse } from "next/server";
import Model from "@/models/model"; 
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const models = await Model.find().sort({ createdAt: -1 });
    return NextResponse.json(models);
  } catch (error) {
    console.error("Failed to fetch models:", error);
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    );
  }
}