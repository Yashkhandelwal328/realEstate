import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyPageClient } from "./PropertyPageClient";

// SEO: Dynamic metadata per property
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await prisma.property.findUnique({ where: { slug } });

  if (!property) {
    return { title: "Property Not Found — Khandelwal Real Estate" };
  }

  return {
    title: `${property.title} — ${property.location} | Khandelwal Real Estate`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} — ${property.price}`,
      description: property.description.slice(0, 160),
      images: property.images.length > 0 ? [property.images[0]] : [],
      type: "website",
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const property = await prisma.property.findUnique({
    where: { slug },
  });

  if (!property) {
    notFound();
  }

  // Fetch related properties (same location, exclude current, limit 3)
  const relatedProperties = await prisma.property.findMany({
    where: {
      location: property.location,
      id: { not: property.id },
      isAvailable: true,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <PropertyPageClient property={property} />

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="relative py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="font-label text-xs text-primary">
                More in {property.location}
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Similar{" "}
                <span className="text-gradient-gold">Properties</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((rp) => (
                <PropertyCard key={rp.id} property={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
