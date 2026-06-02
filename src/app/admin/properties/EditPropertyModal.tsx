"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, ImageIcon } from "lucide-react";
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
import { updateProperty, uploadPropertyImages, uploadFiles } from "@/app/actions/property";
import imageCompression from "browser-image-compression";

export function EditPropertyModal({ property }: { property: any }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lifestyleSections, setLifestyleSections] = useState<any[]>(property.lifestyleSections || []);
  const [floorPlans, setFloorPlans] = useState<any[]>(property.floorPlans || []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let finalImageUrls: string[] = property.images ? [...property.images] : [];
      
      const coverImageFile = formData.get("coverImage") as File;
      if (coverImageFile && coverImageFile.size > 0) {
        let fileToUpload: File | Blob = coverImageFile;
        try {
          fileToUpload = await imageCompression(coverImageFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
        } catch (error) {
          console.error("Compression failed", error);
        }
        
        const singleFormData = new FormData();
        singleFormData.append("images", fileToUpload, coverImageFile.name);
        
        const res = await uploadPropertyImages(singleFormData);
        if (res.success && res.urls && res.urls.length > 0) {
          if (finalImageUrls.length > 0) {
             finalImageUrls[0] = res.urls[0];
          } else {
             finalImageUrls.push(res.urls[0]);
          }
        }
      }

      const imageFiles = formData.getAll("images") as File[];
      
      if (imageFiles.length > 0 && imageFiles[0].size > 0) {
        for (const f of imageFiles) {
          let fileToUpload: File | Blob = f;
          try {
            fileToUpload = await imageCompression(f, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
          } catch (error) {
            console.error("Compression failed", error);
          }
          
          const singleFormData = new FormData();
          singleFormData.append("images", fileToUpload, f.name);
          
          const res = await uploadPropertyImages(singleFormData);
          if (res.success && res.urls) {
            // If new gallery images are uploaded, they REPLACE the existing gallery except the cover image (if we just uploaded a new one, we should keep it).
            // Actually, if we upload new gallery, let's just clear and append. But if we already updated the cover image, we should keep the cover image and append the rest?
            // To be safe, if we upload a new gallery, we clear the old one. If coverImage was also uploaded, we keep it as index 0.
            if (finalImageUrls === property.images || finalImageUrls.length === property.images?.length) {
              // We haven't cleared it yet. 
              // Wait, if cover image was uploaded, finalImageUrls has same length, just index 0 is different.
              // We should just clear it, but preserve finalImageUrls[0] IF coverImage was uploaded.
              const savedCover = coverImageFile && coverImageFile.size > 0 ? finalImageUrls[0] : null;
              finalImageUrls = savedCover ? [savedCover] : [];
            }
            finalImageUrls.push(...res.urls);
          }
        }
      }

      const updatedLifestyleSections = [...lifestyleSections];
      for (let i = 0; i < lifestyleSections.length; i++) {
        const lfFile = formData.get(`lifestyle-image-${i}`) as File;
        if (lfFile && lfFile.size > 0) {
          let fileToUpload: File | Blob = lfFile;
          try {
            fileToUpload = await imageCompression(lfFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
          } catch (e) {
            console.error("Compression failed", e);
          }
          
          const singleLfData = new FormData();
          singleLfData.append(`lifestyle-${i}`, fileToUpload, lfFile.name);
          
          const lfRes = await uploadFiles(singleLfData);
          if (lfRes.success && lfRes.urls && lfRes.urls[`lifestyle-${i}`]) {
            updatedLifestyleSections[i].image = lfRes.urls[`lifestyle-${i}`];
          }
        }
      }

      const updatedFloorPlans = [...floorPlans];
      for (let i = 0; i < floorPlans.length; i++) {
        const fpFile = formData.get(`floorplan-image-${i}`) as File;
        if (fpFile && fpFile.size > 0) {
          let fileToUpload: File | Blob = fpFile;
          try {
            fileToUpload = await imageCompression(fpFile, { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
          } catch (e) {
            console.error("Compression failed", e);
          }
          
          const singleFpData = new FormData();
          singleFpData.append(`floorplan-${i}`, fileToUpload, fpFile.name);
          
          const fpRes = await uploadFiles(singleFpData);
          if (fpRes.success && fpRes.urls && fpRes.urls[`floorplan-${i}`]) {
            updatedFloorPlans[i].image = fpRes.urls[`floorplan-${i}`];
          }
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
        lifestyleSections: updatedLifestyleSections,
        floorPlans: updatedFloorPlans,
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
                <Label htmlFor="location">Location (City Category)</Label>
                <Select name="location" required defaultValue={property.location || "Vrindavan"}>
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
                        <ImageIcon className="size-4" /> Update Section Image
                      </Label>
                      <Input id={`lifestyle-image-${idx}`} name={`lifestyle-image-${idx}`} type="file" accept="image/*" />
                      {sec.image && <p className="text-xs text-green-600">✓ Current image set</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Floor Plans */}
          {floorPlans.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b border-primary/20 pb-2">Floor Plans</h3>
              <p className="text-xs text-muted-foreground">Upload images for the parsed floor plans.</p>
              
              <div className="grid gap-6 md:grid-cols-2">
                {floorPlans.map((fp, idx) => (
                  <div key={idx} className="bg-muted/30 p-4 rounded-xl border border-primary/10">
                    <h4 className="font-semibold">{fp.title}</h4>
                    <p className="text-sm text-primary font-medium mt-1 mb-3">{fp.area}</p>
                    <div className="space-y-2">
                      <Label htmlFor={`floorplan-image-${idx}`} className="flex items-center gap-2">
                        <ImageIcon className="size-4" /> Update Plan Image
                      </Label>
                      <Input id={`floorplan-image-${idx}`} name={`floorplan-image-${idx}`} type="file" accept="image/*" />
                      {fp.image && <p className="text-xs text-green-600">✓ Current image set</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coverImage">Main Cover Image (Replaces Hero Image)</Label>
              <p className="text-xs text-muted-foreground mb-2">Upload a single image to change the main hero image without clearing the rest of the gallery.</p>
              <Input id="coverImage" name="coverImage" type="file" accept="image/*" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Gallery Photos (Upload new to replace ALL existing gallery photos)</Label>
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
