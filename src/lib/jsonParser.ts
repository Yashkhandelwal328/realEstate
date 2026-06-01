/**
 * Safe JSON Parser for AI-generated luxury property output.
 * No external APIs used. Pure parsing and validation.
 */

export interface LifestyleSection {
  title: string;
  description: string;
  amenitiesIncluded: string[];
  image?: string; // Will be matched with manual uploads later
}

export interface FloorPlan {
  title: string;
  area: string;
  image?: string;
}

export interface BuilderInfo {
  name: string;
  description: string;
  logo?: string;
}

export interface ParsedPropertyJson {
  title: string;
  slug: string;
  price: string;
  location: string;
  city: string;
  state: string;
  propertyType: string;
  bhk: string;
  area: string;
  description: string;
  amenities: string[];
  landmarks: string[];
  connectivity: string[];
  highlights: string[];
  reraNumber: string;
  contact: {
    phone: string;
    whatsapp: string;
  };
  images: string[];
  lifestyleSections: LifestyleSection[];
  floorPlans: FloorPlan[];
  builderInfo: BuilderInfo | null;
  rawImportedJson?: any;
}

export interface ParseResult {
  success: boolean;
  data?: ParsedPropertyJson;
  error?: string;
  missingFields?: string[];
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
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

    const slug = typeof data.slug === "string" && data.slug.trim() !== "" 
      ? data.slug.trim() 
      : generateSlug(title);

    const price = typeof data.price === "string" && data.price.trim() !== "" 
      ? data.price.trim() 
      : "Ask for Price";

    const location = typeof data.location === "string" ? data.location.trim() : "";
    if (!location) missingFields.push("location");

    const city = typeof data.city === "string" ? data.city.trim() : "";
    const state = typeof data.state === "string" ? data.state.trim() : "";
    const propertyType = typeof data.propertyType === "string" ? data.propertyType.trim() : "";
    const bhk = typeof data.bhk === "string" ? data.bhk.trim() : "";
    const area = typeof data.area === "string" ? data.area.trim() : "";
    const description = typeof data.description === "string" ? data.description.trim() : "";
    const reraNumber = typeof data.reraNumber === "string" ? data.reraNumber.trim() : "";

    const amenities = Array.isArray(data.amenities)
      ? data.amenities.filter((a: any) => typeof a === "string").map((a: string) => a.trim())
      : [];

    const landmarks = Array.isArray(data.landmarks)
      ? data.landmarks.filter((a: any) => typeof a === "string").map((a: string) => a.trim())
      : [];

    const connectivity = Array.isArray(data.connectivity)
      ? data.connectivity.filter((a: any) => typeof a === "string").map((a: string) => a.trim())
      : [];

    const highlights = Array.isArray(data.highlights)
      ? data.highlights.filter((a: any) => typeof a === "string").map((a: string) => a.trim())
      : [];

    const images = Array.isArray(data.images)
      ? data.images.filter((a: any) => typeof a === "string").map((a: string) => a.trim())
      : [];

    const contact = {
      phone: data.contact?.phone && typeof data.contact.phone === "string" ? data.contact.phone.trim() : "",
      whatsapp: data.contact?.whatsapp && typeof data.contact.whatsapp === "string" ? data.contact.whatsapp.trim() : "",
    };

    // Complex Objects Mapping
    const lifestyleSections: LifestyleSection[] = Array.isArray(data.lifestyleSections)
      ? data.lifestyleSections.map((sec: any) => ({
          title: typeof sec.title === "string" ? sec.title.trim() : "",
          description: typeof sec.description === "string" ? sec.description.trim() : "",
          amenitiesIncluded: Array.isArray(sec.amenitiesIncluded) 
            ? sec.amenitiesIncluded.filter((a: any) => typeof a === "string").map((a: string) => a.trim()) 
            : [],
          image: typeof sec.image === "string" ? sec.image.trim() : "",
        }))
      : [];

    const floorPlans: FloorPlan[] = Array.isArray(data.floorPlans)
      ? data.floorPlans.map((fp: any) => ({
          title: typeof fp.title === "string" ? fp.title.trim() : "",
          area: typeof fp.area === "string" ? fp.area.trim() : "",
          image: typeof fp.image === "string" ? fp.image.trim() : "",
        }))
      : [];

    let builderInfo: BuilderInfo | null = null;
    if (data.builderInfo && typeof data.builderInfo === "object") {
      builderInfo = {
        name: typeof data.builderInfo.name === "string" ? data.builderInfo.name.trim() : "",
        description: typeof data.builderInfo.description === "string" ? data.builderInfo.description.trim() : "",
        logo: typeof data.builderInfo.logo === "string" ? data.builderInfo.logo.trim() : "",
      };
    }

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
        slug,
        price,
        location,
        city,
        state,
        propertyType,
        bhk,
        area,
        description,
        amenities,
        landmarks,
        connectivity,
        highlights,
        reraNumber,
        contact,
        images,
        lifestyleSections,
        floorPlans,
        builderInfo,
        rawImportedJson: data, // Store raw data for debugging/editing
      }
    };

  } catch (err: any) {
    return {
      success: false,
      error: "Invalid JSON format. Please ensure it is properly formatted.",
    };
  }
}
