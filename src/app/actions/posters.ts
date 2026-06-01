"use server";
import { revalidatePath } from "next/cache";
import { writeFile, unlink, readdir, mkdir } from "fs/promises";
import path from "path";

const POSTERS_DIR = path.join(process.cwd(), "public", "posters");

async function ensureDir() {
  try {
    await readdir(POSTERS_DIR);
  } catch {
    await mkdir(POSTERS_DIR, { recursive: true });
  }
}

export async function getPosters() {
  try {
    await ensureDir();
    const files = await readdir(POSTERS_DIR);
    // Filter only images
    const images = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|webp|gif)$/i)
    );
    // Return relative paths that the browser can load
    return images.map(file => `/posters/${file}`);
  } catch (error) {
    console.error("Failed to read posters directory:", error);
    return [];
  }
}

export async function uploadPoster(formData: FormData) {
  try {
    await ensureDir();
    const file = formData.get("file") as File;
    
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Create a safe, unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const filepath = path.join(POSTERS_DIR, filename);

    await writeFile(filepath, buffer);
    
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
    // Extract filename from the relative path (e.g. "/posters/1.jpeg" -> "1.jpeg")
    const filename = path.basename(posterPath);
    if (!filename) return { success: false, error: "Invalid path" };

    const filepath = path.join(POSTERS_DIR, filename);
    await unlink(filepath);

    revalidatePath("/");
    revalidatePath("/admin/content");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete poster:", error);
    return { success: false, error: "Failed to delete file" };
  }
}
