import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { imageId } = await request.json();
  console.log("Received imageId:", imageId);
  return NextResponse.json({ message: "Vibe check successful!" });
}
