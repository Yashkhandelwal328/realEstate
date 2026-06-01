"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createProperty, uploadPropertyImages, uploadFiles } from "@/app/actions/property";
import imageCompression from "browser-image-compression";
import { ParsedPropertyJson, LifestyleSection, FloorPlan } from "@/lib/jsonParser";

interface AddPropertyModalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  initialData?: ParsedPropertyJson | null;
}

export function AddPropertyModal({ open: externalOpen, setOpen: setExternalOpen, initialData }: AddPropertyModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = setExternalOpen || setInternalOpen;

  const [importedImages, setImportedImages] = useState<string[]>([]);
  const [lifestyleSections, setLifestyleSections] = useState<LifestyleSection[]>([]);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([]);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (open) {
      setImportedImages(initialData?.images || []);
      setLifestyleSections(initialData?.lifestyleSections || []);
      setFloorPlans(initialData?.floorPlans || []);
    } else {
      setFormKey(prev => prev + 1);
    }
  }, [open, initialData]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const uploadData = new FormData();
      let hasUploads = false;

      // Process Gallery Images
      const imageFiles = formData.getAll("images") as File[];
      for (const f of imageFiles) {
        if (f.size > 0) {
          try {
            const compressed = await imageCompression(f, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
            uploadData.append("images", compressed, f.name);
            hasUploads = true;
          } catch (e) {
            uploadData.append("images", f);
            hasUploads = true;
          }
        }
      }

      // Process Lifestyle Images
      for (let i = 0; i < lifestyleSections.length; i++) {
        const lfFile = formData.get(`lifestyle-image-${i}`) as File;
        if (lfFile && lfFile.size > 0) {
          try {
            const compressed = await imageCompression(lfFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
            uploadData.append(`lifestyle-${i}`, compressed, lfFile.name);
            hasUploads = true;
          } catch (e) {
            uploadData.append(`lifestyle-${i}`, lfFile);
            hasUploads = true;
          }
        }
      }

      let newGalleryUrls: string[] = [];
      let mappedLifestyleUrls: Record<string, string> = {};

      if (hasUploads) {
        const res = await uploadFiles(uploadData);
        if (res.success && res.urls) {
          // Separate gallery images from lifestyle images
          // The uploadFiles action processes everything and returns a map.
          // Wait, uploadPropertyImages returns an array. uploadFiles returns a map!
          // We changed uploadFiles to handle named keys. If key is "images", it overwrites?
          // Let's use uploadPropertyImages for gallery and uploadFiles for lifestyle.
          // Actually, our uploadFiles action in property.ts loops over entries and maps key -> url.
          // But FormData can have multiple 'images' keys. Object.fromEntries / map doesn't support multiple keys well in my returned result.
          // Let's just upload them in two separate batches for safety.
        }
      }

      // Let's do it safely:
      let finalImageUrls = [...importedImages];
      
      if (imageFiles.length > 0 && imageFiles[0].size > 0) {
        const galleryData = new FormData();
        imageFiles.forEach(f => galleryData.append("images", f));
        const galRes = await uploadPropertyImages(galleryData);
        if (galRes.success && galRes.urls) {
          finalImageUrls = [...finalImageUrls, ...galRes.urls];
        }
      }

      const updatedLifestyleSections = [...lifestyleSections];
      const lfUploadData = new FormData();
      let hasLfUploads = false;
      for (let i = 0; i < lifestyleSections.length; i++) {
        const f = formData.get(`lifestyle-image-${i}`) as File;
        if (f && f.size > 0) {
          lfUploadData.append(`lifestyle-${i}`, f);
          hasLfUploads = true;
        }
      }

      if (hasLfUploads) {
        const lfRes = await uploadFiles(lfUploadData);
        if (lfRes.success && lfRes.urls) {
          for (let i = 0; i < lifestyleSections.length; i++) {
            if (lfRes.urls[`lifestyle-${i}`]) {
              updatedLifestyleSections[i].image = lfRes.urls[`lifestyle-${i}`];
            }
          }
        }
      }

      // 2. Create property
      await createProperty({
        title: (formData.get("title") as string) || "",
        slug: (formData.get("slug") as string) || null,
        description: (formData.get("description") as string) || "",
        location: (formData.get("location") as string) || "Vrindavan",
        city: (formData.get("city") as string) || null,
        state: (formData.get("state") as string) || null,
        price: (formData.get("price") as string) || "",
        type: (formData.get("propertyType") as string) || "Flats",
        dimensions: (formData.get("dimensions") as string) || "",
        amenities: ((formData.get("amenities") as string) || "").split(",").map(a => a.trim()).filter(Boolean),
        landmarks: ((formData.get("landmarks") as string) || "").split(",").map(a => a.trim()).filter(Boolean),
        connectivity: ((formData.get("connectivity") as string) || "").split(",").map(a => a.trim()).filter(Boolean),
        highlights: ((formData.get("highlights") as string) || "").split(",").map(a => a.trim()).filter(Boolean),
        reraNumber: (formData.get("reraNumber") as string) || null,
        contactPhone: (formData.get("contactPhone") as string) || null,
        contactWhatsapp: (formData.get("contactWhatsapp") as string) || null,
        isFeatured: formData.get("isFeatured") === "on",
        images: finalImageUrls,
        gmapsUrl: (formData.get("gmapsUrl") as string) || null,
        lifestyleSections: updatedLifestyleSections,
        floorPlans: floorPlans, // For now, we'll just pass the parsed JSON for floor plans directly
        rawImportedJson: initialData?.rawImportedJson || null,
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {externalOpen === undefined && (
        <DialogTrigger asChild>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="size-4 mr-2" /> Add Property
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Luxury Property</DialogTitle>
          <DialogDescription>
            Fill in the details for the premium listing.
          </DialogDescription>
        </DialogHeader>
        <form key={formKey} onSubmit={onSubmit} className="space-y-8 py-4">
          
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-primary/20 pb-2">Basic Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={initialData?.title} required placeholder="e.g. The Royal Villa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (Optional - Auto generated if blank)</Label>
                <Input id="slug" name="slug" defaultValue={initialData?.slug} placeholder="e.g. the-royal-villa" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" defaultValue={initialData?.price} required placeholder="e.g. ₹ 4.5 Cr" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType">Type</Label>
                <Input id="propertyType" name="propertyType" defaultValue={initialData?.propertyType || "Apartment"} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">BHK & Area</Label>
                <Input id="dimensions" name="dimensions" defaultValue={initialData ? `${initialData.bhk} • ${initialData.area}` : ""} required placeholder="e.g. 4 BHK • 4500 sqft" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea id="description" name="description" defaultValue={initialData?.description} required className="min-h-[100px]" />
            </div>
          </div>

          {/* Section: Location Data */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-primary/20 pb-2">Location & Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location (City Category)</Label>
                <Select name="location" required defaultValue={initialData?.location || "Vrindavan"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vrindavan">Vrindavan</SelectItem>
                    <SelectItem value="Mathura">Mathura</SelectItem>
                    <SelectItem value="Barsana">Barsana</SelectItem>
                    <SelectItem value="Govardhan">Govardhan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" defaultValue={initialData?.city} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" defaultValue={initialData?.state} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="landmarks">Landmarks (comma-separated)</Label>
                <Input id="landmarks" name="landmarks" defaultValue={initialData?.landmarks?.join(", ")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="connectivity">Connectivity (comma-separated)</Label>
                <Input id="connectivity" name="connectivity" defaultValue={initialData?.connectivity?.join(", ")} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input id="amenities" name="amenities" defaultValue={initialData?.amenities.join(", ")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="highlights">Highlights (comma-separated)</Label>
                <Input id="highlights" name="highlights" defaultValue={initialData?.highlights?.join(", ")} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reraNumber">RERA Number</Label>
                <Input id="reraNumber" name="reraNumber" defaultValue={initialData?.reraNumber} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gmapsUrl">Google Maps Embed URL</Label>
                <Input id="gmapsUrl" name="gmapsUrl" />
              </div>
            </div>
          </div>

          {/* Section: Lifestyle Portfolios */}
          {lifestyleSections.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-primary/20 pb-2">Lifestyle Sections</h3>
              <p className="text-xs text-muted-foreground">Upload cinematic images to pair with the imported lifestyle text.</p>
              
              <div className="grid gap-6">
                {lifestyleSections.map((sec, idx) => (
                  <div key={idx} className="bg-muted/30 p-4 rounded-xl border border-primary/10">
                    <h4 className="font-semibold">{sec.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">{sec.description}</p>
                    <div className="space-y-2">
                      <Label htmlFor={`lifestyle-image-${idx}`} className="flex items-center gap-2">
                        <ImageIcon className="size-4" /> Upload Section Image
                      </Label>
                      <Input id={`lifestyle-image-${idx}`} name={`lifestyle-image-${idx}`} type="file" accept="image/*" />
                      {sec.image && <p className="text-xs text-green-600">✓ Image configured from JSON</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Media & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-primary/20 pb-2">Media & Contact</h3>
            <div className="space-y-2">
              <Label htmlFor="images">Main Property Gallery (Multiple)</Label>
              {importedImages.length > 0 && (
                <p className="text-xs text-muted-foreground mb-2">Imported {importedImages.length} images.</p>
              )}
              <Input id="images" name="images" type="file" multiple accept="image/*" required={importedImages.length === 0} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" name="contactPhone" defaultValue={initialData?.contact?.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactWhatsapp">Contact WhatsApp</Label>
                <Input id="contactWhatsapp" name="contactWhatsapp" defaultValue={initialData?.contact?.whatsapp} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" id="isFeatured" name="isFeatured" className="rounded border-gray-300 text-primary" />
              <Label htmlFor="isFeatured">Featured Property (Shows on Homepage)</Label>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" disabled={loading} className="w-full sm:w-auto px-8 bg-gradient-gold text-primary-foreground shadow-glow">
              {loading ? "Publishing Luxury Property..." : "Save Property"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
