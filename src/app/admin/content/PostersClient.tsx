"use client";
import { useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadPoster, deletePoster } from "@/app/actions/posters";

export function PostersClient({ initialPosters }: { initialPosters: string[] }) {
  const [loading, setLoading] = useState(false);
  const [posters, setPosters] = useState(initialPosters);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadPoster(formData);
    if (res.success) {
      // Optimistically reload window or just let Server Action revalidate do its thing
      window.location.reload();
    } else {
      alert("Failed to upload");
      setLoading(false);
    }
  };

  const handleDelete = async (path: string) => {
    if (!confirm("Are you sure you want to delete this poster?")) return;
    
    setLoading(true);
    const res = await deletePoster(path);
    if (res.success) {
      setPosters(posters.filter(p => p !== path));
    } else {
      alert("Failed to delete");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card border border-primary/20 rounded-xl p-6">
        <div>
          <h2 className="text-xl font-display text-primary">Upload New Poster</h2>
          <p className="text-sm text-muted-foreground mt-1">Add a new image to the Gallery section on the home page.</p>
        </div>
        <div>
          <input 
            type="file" 
            id="poster-upload" 
            className="hidden" 
            accept="image/*"
            onChange={handleUpload}
            disabled={loading}
          />
          <Button asChild disabled={loading}>
            <label htmlFor="poster-upload" className="cursor-pointer">
              <Upload className="size-4 mr-2" />
              {loading ? "Uploading..." : "Select File"}
            </label>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posters.map((posterPath) => (
          <div key={posterPath} className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-primary/20 bg-background/50">
            <img 
              src={posterPath} 
              alt="Poster" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button 
                variant="destructive" 
                size="sm"
                disabled={loading}
                onClick={() => handleDelete(posterPath)}
              >
                <Trash2 className="size-4 mr-2" /> Delete
              </Button>
            </div>
          </div>
        ))}
        {posters.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No posters uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
