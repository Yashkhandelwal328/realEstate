"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddPropertyModal } from "./AddPropertyModal";
import { ImportJsonModal } from "./ImportJsonModal";
import { ParsedPropertyJson } from "@/lib/jsonParser";

export function PropertyActions() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [importData, setImportData] = useState<ParsedPropertyJson | null>(null);

  const handleImport = (data: ParsedPropertyJson) => {
    setImportData(data);
    setAddModalOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setAddModalOpen(open);
    if (!open) {
      setImportData(null);
    }
  };

  const handleManualAdd = () => {
    setImportData(null);
    setAddModalOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <ImportJsonModal onImport={handleImport} />
      <Button onClick={handleManualAdd} className="bg-primary text-primary-foreground">
        <Plus className="size-4 mr-2" /> Add Property
      </Button>
      <AddPropertyModal 
        open={addModalOpen} 
        setOpen={handleOpenChange} 
        initialData={importData} 
      />
    </div>
  );
}
