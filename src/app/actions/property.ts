"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

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
  landmarks?: string[];
  contactPhone?: string | null;
  contactWhatsapp?: string | null;
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
    ...(data.landmarks ? { landmarks: data.landmarks } : {}),
    ...(data.contactPhone ? { contactPhone: data.contactPhone } : {}),
    ...(data.contactWhatsapp ? { contactWhatsapp: data.contactWhatsapp } : {}),
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
    const files = formData.getAll("images") as File[];
    const urls: string[] = [];

    for (const file of files) {
      if (!file || !(file instanceof File)) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = buffer.toString("base64");
      
      const imageRecord = await prisma.image.create({
        data: {
          data: base64Data,
          mimeType: file.type || "image/jpeg",
          category: "property",
        }
      });
      
      urls.push(`/api/images/${imageRecord.id}`);
    }

    return { success: true, urls };
  } catch (error) {
    console.error("Failed to upload property images:", error);
    return { success: false, error: "Upload failed" };
  }
}
