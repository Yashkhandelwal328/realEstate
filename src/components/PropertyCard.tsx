import Link from "next/link";

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  type: string;
  dimensions: string;
  images: string[];
}

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images && property.images.length > 0 
    ? property.images[0] 
    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%230F0F1E'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='24' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";

  return (
    <div className="glass rounded-3xl border border-primary/10 p-6 shadow-elegant flex flex-col h-full hover:border-primary/40 transition-colors group">
      <Link href={`/property/${property.id}`} className="block overflow-hidden rounded-t-2xl -mx-2 -mt-2 md:-mx-4 md:-mt-4 mb-4">
        <img 
          src={image} 
          alt={property.title} 
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </Link>
      
      <div className="font-label text-xs text-primary uppercase tracking-[0.3em] flex justify-between items-center">
        <span>{property.dimensions}</span>
        <span>{property.type}</span>
      </div>
      
      <Link href={`/property/${property.id}`}>
        <h4 className="mt-4 font-display text-2xl text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {property.title}
        </h4>
      </Link>
      
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-grow line-clamp-2">
        {property.description}
      </p>
      
      <div className="mt-4 text-lg font-semibold text-primary">
        {property.price}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link 
          href={`/property/${property.id}`}
          className="flex-1 text-center rounded-full bg-primary/10 border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/20"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={() => (window.location.hash = "#contact")}
          className="flex-1 text-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}
