"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitInquiry(data: { name: string; phone: string }) {
  try {
    await prisma.inquiry.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: "",    // Not requested in popup
        message: "From Lead Capture Popup", // Automatic message
      },
    });
    
    // Revalidate admin page so the new lead shows up
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: "Database error" };
  }
}
