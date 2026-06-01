import prisma from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { MessageCircle, Phone, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function InquiriesAdmin() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-primary">Inquiries & Leads</h1>
        <p className="text-muted-foreground mt-1">View leads captured from the popup and contact forms.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {inquiries.length === 0 ? (
          <p className="text-muted-foreground py-8 col-span-full">No inquiries found yet.</p>
        ) : (
          inquiries.map((inq) => (
            <Card key={inq.id} className="bg-card border-primary/20">
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <User className="size-4" />
                    {inq.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(inq.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Phone className="size-4 text-muted-foreground" />
                  {inq.phone}
                </div>

                {inq.message && inq.message !== "From Lead Capture Popup" && (
                  <div className="pt-3 border-t border-primary/10 mt-3 text-sm text-muted-foreground">
                    <p className="font-semibold text-xs text-primary mb-1">Message:</p>
                    {inq.message}
                  </div>
                )}
                
                <div className="pt-4 flex gap-2">
                  <a 
                    href={`tel:${inq.phone.replace(/[^0-9+]/g, '')}`} 
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                  >
                    <Phone className="size-3" /> Call
                  </a>
                  <a 
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`} 
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md bg-green-500/10 text-green-500 text-xs font-semibold hover:bg-green-500/20 transition-colors"
                  >
                    <MessageCircle className="size-3" /> WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
