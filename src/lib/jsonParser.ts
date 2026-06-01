/**
 * Safe JSON Parser for AI-generated property output.
 * No external APIs used. Pure parsing and validation.
 */

export interface ParsedPropertyJson {
  title: string;
  price: string;
  location: string;
  propertyType: string;
  bhk: string;
  area: string;
  description: string;
  amenities: string[];
  landmarks: string[];
  contact: {
    phone: string;
    whatsapp: string;
  };
  images: string[];
}

export interface ParseResult {
  success: boolean;
  data?: ParsedPropertyJson;
  error?: string;
  missingFields?: string[];
}

export function parsePropertyJson(jsonString: string): ParseResult {
  try {
    // Basic sanitization to strip markdown blocks if AI output it
    let cleanJson = jsonString.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json/, "");
      cleanJson = cleanJson.replace(/```$/, "");
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```/, "");
      cleanJson = cleanJson.replace(/```$/, "");
    }
    cleanJson = cleanJson.trim();

    const data = JSON.parse(cleanJson);
    const missingFields: string[] = [];

    // Safe extraction with fallbacks and type checks
    const title = typeof data.title === "string" ? data.title.trim() : "";
    if (!title) missingFields.push("title");

    const price = typeof data.price === "string" ? data.price.trim() : "";
    if (!price) missingFields.push("price");

    const location = typeof data.location === "string" ? data.location.trim() : "";
    if (!location) missingFields.push("location");

    const propertyType = typeof data.propertyType === "string" ? data.propertyType.trim() : "";
    
    const bhk = typeof data.bhk === "string" ? data.bhk.trim() : "";
    const area = typeof data.area === "string" ? data.area.trim() : "";
    
    const description = typeof data.description === "string" ? data.description.trim() : "";

    const amenities = Array.isArray(data.amenities)
      ? data.amenities.filter((a: any) => typeof a === "string").map((a: string) => a.trim())
      : [];

    const landmarks = Array.isArray(data.landmarks)
      ? data.landmarks.filter((a: any) => typeof a === "string").map((a: string) => a.trim())
      : [];

    const images = Array.isArray(data.images)
      ? data.images.filter((a: any) => typeof a === "string").map((a: string) => a.trim())
      : [];

    const contact = {
      phone: data.contact?.phone && typeof data.contact.phone === "string" ? data.contact.phone.trim() : "",
      whatsapp: data.contact?.whatsapp && typeof data.contact.whatsapp === "string" ? data.contact.whatsapp.trim() : "",
    };

    if (missingFields.length > 0) {
      return {
        success: false,
        error: "Missing required fields.",
        missingFields
      };
    }

    return {
      success: true,
      data: {
        title,
        price,
        location,
        propertyType,
        bhk,
        area,
        description,
        amenities,
        landmarks,
        contact,
        images,
      }
    };

  } catch (err: any) {
    return {
      success: false,
      error: "Invalid JSON format. Please ensure it is properly formatted.",
    };
  }
}
