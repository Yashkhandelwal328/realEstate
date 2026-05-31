import prisma from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Plus, Trash, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { deleteProperty } from "@/app/actions/property";

export default async function PropertiesAdmin() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display text-primary">Properties</h1>
          <p className="text-muted-foreground mt-1">Manage your real estate listings.</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="size-4 mr-2" /> Add Property
        </Button>
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
                  <Button variant="outline" size="sm">
                    <Edit className="size-4" />
                  </Button>
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
