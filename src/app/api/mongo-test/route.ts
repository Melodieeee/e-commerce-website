import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: "Connected!" });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}