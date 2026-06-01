"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir, readdir } from "fs/promises";
import path from "path";

const PROPERTIES_DIR = path.join(process.cwd(), "public", "properties");

async function ensureDir() {
  try {
    await readdir(PROPERTIES_DIR);
  } catch {
    await mkdir(PROPERTIES_DIR, { recursive: true });
  }
}

export async function createProperty(data: {
  title: string;
  description: string;
  location: string;
  price: string;
  type: string;
  amenities: string[];
  dimensions: string;
  isFeatured: boolean;
  images: string[];
  gmapsUrl?: string | null;
}) {
  const createData: Parameters<typeof prisma.property.create>[0]["data"] = {
    title: data.title,
    description: data.description,
    location: data.location,
    price: data.price,
    type: data.type,
    amenities: data.amenities,
    dimensions: data.dimensions,
    isFeatured: data.isFeatured,
    images: data.images,
    ...(data.gmapsUrl ? { gmapsUrl: data.gmapsUrl } : {}),
  };

  const property = await prisma.property.create({
    data: createData,
  });
  revalidatePath("/admin/properties");
  revalidatePath("/");
  return property;
}

export async function updateProperty(id: string, data: Partial<any>) {
  const property = await prisma.property.update({
    where: { id },
    data,
  });
  revalidatePath("/admin/properties");
  revalidatePath("/");
  return property;
}

export async function deleteProperty(id: string) {
  await prisma.property.delete({ where: { id } });
  revalidatePath("/admin/properties");
  revalidatePath("/");
}

export async function uploadPropertyImages(formData: FormData) {
  try {
    await ensureDir();
    const files = formData.getAll("images") as File[];
    const urls: string[] = [];

    for (const file of files) {
      if (!file || !(file instanceof File)) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
      const filepath = path.join(PROPERTIES_DIR, filename);
      await writeFile(filepath, buffer);
      urls.push(`/properties/${filename}`);
    }

    return { success: true, urls };
  } catch (error) {
    console.error("Failed to upload property images:", error);
    return { success: false, error: "Upload failed" };
  }
}
