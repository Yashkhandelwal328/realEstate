"use client";

import { useState } from "react";
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

export function AddPropertyModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      // 1. Upload images if any
      let uploadedUrls: string[] = [];
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
          uploadedUrls = res.urls;
        }
      }

      // 2. Create property
      await createProperty({
        title: (formData.get("title") as string) || "",
        description: (formData.get("description") as string) || "",
        location: (formData.get("location") as string) || "Vrindavan",
        price: (formData.get("price") as string) || "",
        type: (formData.get("type") as string) || "Flats",
        amenities: ((formData.get("amenities") as string) || "").split(",").map(a => a.trim()).filter(Boolean),
        dimensions: (formData.get("dimensions") as string) || "", 
        isFeatured: formData.get("isFeatured") === "on",
        images: uploadedUrls,
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
        <Button className="bg-primary text-primary-foreground">
          <Plus className="size-4 mr-2" /> Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Enter the details of the new property here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required placeholder="e.g. Sacred 3 BHK" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" required placeholder="e.g. ₹ 45,00,000" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required placeholder="Property details..." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select name="location" required defaultValue="Vrindavan">
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
              <Select name="type" required defaultValue="Flats">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plots">Plots</SelectItem>
                  <SelectItem value="Flats">Flats</SelectItem>
                  <SelectItem value="Villas">Villas</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dimensions">Size / Dimensions (BHK)</Label>
              <Input id="dimensions" name="dimensions" required placeholder="e.g. 3 BHK or 26 Gunta" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (comma-separated)</Label>
              <Input id="amenities" name="amenities" placeholder="e.g. Garden, Security, Parking" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Photos (Upload multiple)</Label>
            <Input id="images" name="images" type="file" multiple accept="image/*" required />
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
