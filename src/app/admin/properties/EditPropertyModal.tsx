"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
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
import { updateProperty, uploadPropertyImages } from "@/app/actions/property";
import imageCompression from "browser-image-compression";

export function EditPropertyModal({ property }: { property: any }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let finalImageUrls: string[] = property.images || [];
      const imageFiles = formData.getAll("images") as File[];
      
      if (imageFiles.length > 0 && imageFiles[0].size > 0) {
        const uploadData = new FormData();
        for (const f of imageFiles) {
          try {
            const compressed = await imageCompression(f, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
            uploadData.append("images", compressed, f.name);
          } catch (error) {
            uploadData.append("images", f);
          }
        }
        const res = await uploadPropertyImages(uploadData);
        if (res.success && res.urls) {
          finalImageUrls = res.urls; // Replace images if new ones uploaded
        }
      }

      await updateProperty(property.id, {
        title: (formData.get("title") as string) || "",
        slug: (formData.get("slug") as string) || property.slug,
        description: (formData.get("description") as string) || "",
        location: (formData.get("location") as string) || "Vrindavan",
        city: (formData.get("city") as string) || null,
        state: (formData.get("state") as string) || null,
        price: (formData.get("price") as string) || "",
        type: (formData.get("propertyType") as string) || property.type,
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
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>
            Update the property details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={property.title} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" name="slug" defaultValue={property.slug} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" defaultValue={property.price} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyType">Type</Label>
                <Input id="propertyType" name="propertyType" defaultValue={property.type} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions">BHK & Area</Label>
                <Input id="dimensions" name="dimensions" defaultValue={property.dimensions} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea id="description" name="description" defaultValue={property.description} required className="min-h-[100px]" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" defaultValue={property.location} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" defaultValue={property.city || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" defaultValue={property.state || ""} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input id="amenities" name="amenities" defaultValue={property.amenities?.join(", ")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="landmarks">Landmarks (comma-separated)</Label>
                <Input id="landmarks" name="landmarks" defaultValue={property.landmarks?.join(", ")} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="connectivity">Connectivity</Label>
                <Input id="connectivity" name="connectivity" defaultValue={property.connectivity?.join(", ")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="highlights">Highlights</Label>
                <Input id="highlights" name="highlights" defaultValue={property.highlights?.join(", ")} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reraNumber">RERA Number</Label>
              <Input id="reraNumber" name="reraNumber" defaultValue={property.reraNumber || ""} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="images">Photos (Upload new to replace existing)</Label>
              {property.images && property.images.length > 0 && (
                <p className="text-xs text-muted-foreground mb-2">Currently has {property.images.length} photos.</p>
              )}
              <Input id="images" name="images" type="file" multiple accept="image/*" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input id="contactPhone" name="contactPhone" defaultValue={property.contactPhone || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactWhatsapp">Contact WhatsApp</Label>
                <Input id="contactWhatsapp" name="contactWhatsapp" defaultValue={property.contactWhatsapp || ""} />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={property.isFeatured} className="rounded border-gray-300 text-primary" />
              <Label htmlFor="isFeatured">Featured Property</Label>
            </div>
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
