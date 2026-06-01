"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/db";

export async function getPosters() {
  try {
    const images = await prisma.image.findMany({
      where: { category: "poster" },
      orderBy: { createdAt: "desc" }
    });
    return images.map((img: { id: string }) => `/api/images/${img.id}`);
  } catch (error) {
    console.error("Failed to read posters from DB:", error);
    return [];
  }
}

export async function uploadPoster(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Data = buffer.toString("base64");
    
    await prisma.image.create({
      data: {
        data: base64Data,
        mimeType: file.type || "image/jpeg",
        category: "poster",
      }
    });
    
    revalidatePath("/");
    revalidatePath("/admin/content");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to upload poster:", error);
    return { success: false, error: "Failed to upload file" };
  }
}

export async function deletePoster(posterPath: string) {
  try {
    // Extract ID from the path (e.g. "/api/images/cl123..." -> "cl123...")
    const id = posterPath.split('/').pop();
    if (!id) return { success: false, error: "Invalid path" };

    await prisma.image.delete({
      where: { id }
    });

    revalidatePath("/");
    revalidatePath("/admin/content");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete poster:", error);
    return { success: false, error: "Failed to delete file" };
  }
}
