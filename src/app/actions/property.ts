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
