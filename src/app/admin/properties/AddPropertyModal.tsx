"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
import { createProperty, uploadPropertyImages } from "@/app/actions/property";
import imageCompression from "browser-image-compression";
import { ParsedPropertyJson } from "@/lib/jsonParser";

interface AddPropertyModalProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  initialData?: ParsedPropertyJson | null;
}

export function AddPropertyModal({ open: externalOpen, setOpen: setExternalOpen, initialData }: AddPropertyModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use external state if provided, otherwise fallback to internal
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = setExternalOpen || setInternalOpen;

  // Track imported image URLs explicitly
  const [importedImages, setImportedImages] = useState<string[]>([]);
  // We'll use a key to force reset uncontrolled inputs when modal closes
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (open) {
      if (initialData?.images && initialData.images.length > 0) {
        setImportedImages(initialData.images);
      } else {
        setImportedImages([]);
      }
    } else {
      // Reset form when modal closes
      setFormKey(prev => prev + 1);
    }
  }, [open, initialData]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      // 1. Upload images if any new ones are selected
      let finalImageUrls: string[] = [...importedImages];
      const imageFiles = formData.getAll("images") as File[];
      
      if (imageFiles.length > 0 && imageFiles[0].size > 0) {
        const uploadData = new FormData();
        
        for (const f of imageFiles) {
          try {
            const compressedFile = await imageCompression(f, {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            });
            uploadData.append("images", compressedFile, f.name);
          } catch (error) {
            console.error("Compression error:", error);
            uploadData.append("images", f);
          }
        }
        
        const res = await uploadPropertyImages(uploadData);
        if (res.success && res.urls) {
          finalImageUrls = [...finalImageUrls, ...res.urls];
        }
      }

      // 2. Create property
      await createProperty({
        title: (formData.get("title") as string) || "",
        description: (formData.get("description") as string) || "",
        location: (formData.get("location") as string) || "Vrindavan",
        price: (formData.get("price") as string) || "",
        type: (formData.get("type") as string) || "Flats",
        dimensions: (formData.get("dimensions") as string) || "",
        amenities: ((formData.get("amenities") as string) || "").split(",").map(a => a.trim()).filter(Boolean),
        landmarks: ((formData.get("landmarks") as string) || "").split(",").map(a => a.trim()).filter(Boolean),
        contactPhone: (formData.get("contactPhone") as string) || null,
        contactWhatsapp: (formData.get("contactWhatsapp") as string) || null,
        isFeatured: formData.get("isFeatured") === "on",
        images: finalImageUrls,
        gmapsUrl: (formData.get("gmapsUrl") as string) || null,
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
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Enter the details of the new property here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form key={formKey} onSubmit={onSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={initialData?.title} required placeholder="e.g. Sacred 3 BHK" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" defaultValue={initialData?.price} required placeholder="e.g. ₹ 45,00,000" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={initialData?.description} required placeholder="Property details..." className="min-h-[100px]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
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
              <Label htmlFor="type">Property Type</Label>
              <Select name="type" required defaultValue={initialData?.propertyType || "Flats"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plots">Plots</SelectItem>
                  <SelectItem value="Flats">Flats</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Villas">Villas</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dimensions">Size / Dimensions (BHK & Area)</Label>
              <Input id="dimensions" name="dimensions" defaultValue={initialData ? `${initialData.bhk} • ${initialData.area}` : ""} required placeholder="e.g. 3 BHK or 26 Gunta" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input id="amenities" name="amenities" defaultValue={initialData?.amenities.join(", ")} placeholder="e.g. Garden, Security, Parking" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="landmarks">Landmarks (comma-separated)</Label>
            <Input id="landmarks" name="landmarks" defaultValue={initialData?.landmarks?.join(", ")} placeholder="e.g. Prem Mandir, NH-44" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input id="contactPhone" name="contactPhone" defaultValue={initialData?.contact?.phone} placeholder="e.g. 9876543210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactWhatsapp">Contact WhatsApp</Label>
              <Input id="contactWhatsapp" name="contactWhatsapp" defaultValue={initialData?.contact?.whatsapp} placeholder="e.g. 9876543210" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Additional Photos (Upload multiple)</Label>
            {importedImages.length > 0 && (
              <p className="text-xs text-muted-foreground mb-2">
                Imported {importedImages.length} images from JSON. You can add more.
              </p>
            )}
            <Input id="images" name="images" type="file" multiple accept="image/*" required={importedImages.length === 0} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gmapsUrl">Google Maps URL (optional)</Label>
            <Input id="gmapsUrl" name="gmapsUrl" placeholder="https://maps.google.com/..." />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="isFeatured" name="isFeatured" className="rounded border-gray-300 text-primary" />
            <Label htmlFor="isFeatured">Featured Property</Label>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Property"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
