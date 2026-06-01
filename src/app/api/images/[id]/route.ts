import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    
    if (!id) {
      return new NextResponse("Image ID is required", { status: 400 });
    }

    const image = await prisma.image.findUnique({
      where: { id }
    });

    if (!image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    // Convert the base64 string back to a binary buffer
    const buffer = Buffer.from(image.data, "base64");

    // Return the image with the correct Content-Type and caching headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": image.mimeType,
        "Cache-Control": "public, max-age=31536000, immutable", // Cache heavily to reduce DB load
      },
    });
  } catch (error) {
    console.error("Failed to fetch image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
