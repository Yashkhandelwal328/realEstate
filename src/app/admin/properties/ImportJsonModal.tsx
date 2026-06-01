"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileJson, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { parsePropertyJson, ParsedPropertyJson } from "@/lib/jsonParser";

export function ImportJsonModal({ onImport }: { onImport: (data: ParsedPropertyJson) => void }) {
  const [open, setOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [parsedData, setParsedData] = useState<ParsedPropertyJson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const handleParse = () => {
    setError(null);
    setMissingFields([]);
    setParsedData(null);

    if (!jsonInput.trim()) {
      setError("Please paste some JSON first.");
      return;
    }

    const result = parsePropertyJson(jsonInput);
    if (result.success && result.data) {
      setParsedData(result.data);
    } else {
      setError(result.error || "Failed to parse JSON");
      if (result.missingFields) setMissingFields(result.missingFields);
    }
  };

  const handleClear = () => {
    setJsonInput("");
    setError(null);
    setMissingFields([]);
    setParsedData(null);
  };

  const handleContinue = () => {
    if (parsedData) {
      onImport(parsedData);
      setOpen(false);
      handleClear();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
          <FileJson className="size-4 mr-2" /> Import JSON
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Luxury Property JSON</DialogTitle>
          <DialogDescription>
            Paste structured JSON from your AI assistant. The system will parse lifestyle sections, floor plans, and complex metrics automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea 
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{\n  "title": "...",\n  "lifestyleSections": [...]\n}'
            className="font-mono text-xs min-h-[250px] bg-background/50 border-primary/20"
          />

          <div className="flex justify-between items-center">
            <Button type="button" variant="ghost" onClick={handleClear}>Clear</Button>
            <Button type="button" onClick={handleParse} className="bg-primary text-primary-foreground">
              Parse JSON
            </Button>
          </div>

          {/* Validation Errors Section */}
          {(error || missingFields.length > 0) && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="size-4" />
                <span>{error}</span>
              </div>
              {missingFields.length > 0 && (
                <p>Missing required fields: {missingFields.join(", ")}</p>
              )}
            </div>
          )}

          {/* Live Preview Section */}
          {parsedData && (
            <div className="mt-6 space-y-4 border-t border-primary/20 pt-4">
              <h3 className="font-semibold text-lg flex justify-between items-center">
                Live Preview
                <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded">Slug: {parsedData.slug}</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-background/50 p-4 rounded-xl border border-primary/10">
                <div className="col-span-2">
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider">Title</span>
                  <span className="font-medium">{parsedData.title}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider">Price</span>
                  <span className="font-medium text-primary">{parsedData.price}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider">RERA</span>
                  <span className="font-medium">{parsedData.reraNumber || "N/A"}</span>
                </div>
                
                <div className="col-span-2">
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider">Location Overview</span>
                  <span className="font-medium">{parsedData.location}{parsedData.city ? `, ${parsedData.city}` : ""}{parsedData.state ? `, ${parsedData.state}` : ""}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider">Type & BHK</span>
                  <span className="font-medium">{parsedData.propertyType} • {parsedData.bhk}</span>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider">Area</span>
                  <span className="font-medium">{parsedData.area}</span>
                </div>
              </div>

              {/* Lifestyle Sections Preview */}
              {parsedData.lifestyleSections.length > 0 && (
                <div className="bg-background/50 p-4 rounded-xl border border-primary/10">
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider mb-2">Lifestyle Sections ({parsedData.lifestyleSections.length})</span>
                  <div className="space-y-3">
                    {parsedData.lifestyleSections.map((sec, idx) => (
                      <div key={idx} className="text-sm border-l-2 border-primary pl-3">
                        <div className="font-semibold text-foreground">{sec.title}</div>
                        <div className="text-muted-foreground text-xs line-clamp-1">{sec.description}</div>
                        {sec.amenitiesIncluded.length > 0 && (
                          <div className="text-[10px] mt-1 text-primary">Includes: {sec.amenitiesIncluded.join(", ")}</div>
                        )}
                        <div className="text-[10px] italic text-muted-foreground mt-1">Image: {sec.image ? "URL Provided" : "Needs Manual Upload in Form"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Arrays Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm bg-background/50 p-4 rounded-xl border border-primary/10">
                <div>
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider mb-1">Highlights ({parsedData.highlights.length})</span>
                  <ul className="list-disc list-inside text-xs text-muted-foreground">
                    {parsedData.highlights.slice(0, 3).map(a => <li key={a} className="truncate">{a}</li>)}
                    {parsedData.highlights.length > 3 && <li>...</li>}
                  </ul>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider mb-1">Connectivity ({parsedData.connectivity.length})</span>
                  <ul className="list-disc list-inside text-xs text-muted-foreground">
                    {parsedData.connectivity.slice(0, 3).map(a => <li key={a} className="truncate">{a}</li>)}
                    {parsedData.connectivity.length > 3 && <li>...</li>}
                  </ul>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider mb-1">Floor Plans ({parsedData.floorPlans.length})</span>
                  <ul className="list-disc list-inside text-xs text-muted-foreground">
                    {parsedData.floorPlans.map((fp, i) => <li key={i} className="truncate">{fp.title} ({fp.area})</li>)}
                  </ul>
                </div>
              </div>
              
              {parsedData.images.length > 0 && (
                <div className="bg-background/50 p-4 rounded-xl border border-primary/10 text-sm">
                  <span className="text-muted-foreground text-[10px] block uppercase font-bold tracking-wider mb-2">Gallery ({parsedData.images.length})</span>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {parsedData.images.map((img, i) => (
                      <div key={i} className="shrink-0 size-16 rounded overflow-hidden border border-primary/20 bg-muted flex items-center justify-center">
                        {img.startsWith("http") ? (
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] text-center px-1">Invalid URL</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={handleContinue} className="w-full bg-primary text-primary-foreground mt-4 shadow-glow hover:opacity-90">
                Continue to Edit Property
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
