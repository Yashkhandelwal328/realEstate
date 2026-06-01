"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProperty(data: {
  title: string;
  slug?: string | null;
  description: string;
  location: string;
  city?: string | null;
  state?: string | null;
  price: string;
  type: string;
  amenities: string[];
  dimensions: string;
  isFeatured: boolean;
  images: string[];
  landmarks?: string[];
  connectivity?: string[];
  highlights?: string[];
  reraNumber?: string | null;
  contactPhone?: string | null;
  contactWhatsapp?: string | null;
  gmapsUrl?: string | null;
  builderInfo?: any;
  floorPlans?: any;
  lifestyleSections?: any;
  rawImportedJson?: any;
}) {
  const createData: Parameters<typeof prisma.property.create>[0]["data"] = {
    title: data.title,
    slug: data.slug || undefined,
    description: data.description,
    location: data.location,
    city: data.city,
    state: data.state,
    price: data.price,
    type: data.type,
    amenities: data.amenities,
    dimensions: data.dimensions,
    isFeatured: data.isFeatured,
    images: data.images,
    ...(data.landmarks ? { landmarks: data.landmarks } : {}),
    ...(data.connectivity ? { connectivity: data.connectivity } : {}),
    ...(data.highlights ? { highlights: data.highlights } : {}),
    ...(data.reraNumber ? { reraNumber: data.reraNumber } : {}),
    ...(data.contactPhone ? { contactPhone: data.contactPhone } : {}),
    ...(data.contactWhatsapp ? { contactWhatsapp: data.contactWhatsapp } : {}),
    ...(data.gmapsUrl ? { gmapsUrl: data.gmapsUrl } : {}),
    ...(data.builderInfo ? { builderInfo: data.builderInfo } : {}),
    ...(data.floorPlans ? { floorPlans: data.floorPlans } : {}),
    ...(data.lifestyleSections ? { lifestyleSections: data.lifestyleSections } : {}),
    ...(data.rawImportedJson ? { rawImportedJson: data.rawImportedJson } : {}),
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

export async function uploadFiles(formData: FormData) {
  try {
    const result: Record<string, string> = {};

    for (const [key, file] of formData.entries()) {
      if (!file || !(file instanceof File) || file.size === 0) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Data = buffer.toString("base64");
      
      const imageRecord = await prisma.image.create({
        data: {
          data: base64Data,
          mimeType: file.type || "image/jpeg",
          category: key.startsWith("lifestyle") ? "lifestyle" : "property",
        }
      });
      
      result[key] = `/api/images/${imageRecord.id}`;
    }

    return { success: true, urls: result };
  } catch (error) {
    console.error("Failed to upload files:", error);
    return { success: false, error: "Upload failed" };
  }
}
