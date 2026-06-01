import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { deleteProperty } from "@/app/actions/property";
import { AddPropertyModal } from "./AddPropertyModal";

import { EditPropertyModal } from "./EditPropertyModal";

import { PropertyActions } from "./PropertyActions";

export default async function PropertiesAdmin() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display text-primary">Properties</h1>
          <p className="text-muted-foreground mt-1">Manage your real estate listings.</p>
        </div>
        <PropertyActions />
      </div>

      <div className="grid gap-4">
        {properties.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No properties found. Add one to get started.</p>
        ) : (
          properties.map(p => (
            <Card key={p.id} className="bg-card border-primary/20">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.location} • {p.price}</p>
                </div>
                <div className="flex gap-2">
                  <EditPropertyModal property={p} />
                  <form action={async () => {
                    "use server";
                    await deleteProperty(p.id);
                  }}>
                    <Button variant="destructive" size="sm" type="submit">
                      <Trash className="size-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
