import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, MessageSquare, FileText } from "lucide-react";
import prisma from "@/lib/db";

export default async function AdminDashboard() {
  const [propertiesCount, inquiriesCount] = await Promise.all([
    prisma.property.count(),
    prisma.inquiry.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-primary">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome to the Khandelwal Real Estate Admin Portal.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Properties
            </CardTitle>
            <Home className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{propertiesCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Inquiries
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{inquiriesCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Content Sections
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Active</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
