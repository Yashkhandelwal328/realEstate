"use client";

import { useState } from "react";
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

  return (
    <div className="flex flex-wrap gap-3">
      <ImportJsonModal onImport={handleImport} />
      <AddPropertyModal 
        open={addModalOpen} 
        setOpen={handleOpenChange} 
        initialData={importData} 
      />
    </div>
  );
}
