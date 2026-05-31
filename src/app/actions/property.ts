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
}) {
  const property = await prisma.property.create({
    data,
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
