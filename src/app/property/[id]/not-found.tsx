import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="overflow-x-hidden min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center pt-20 pb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="size-10 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Property Not <span className="text-gradient-gold">Found</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The property you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/#locations"
            className="inline-flex justify-center rounded-full bg-gradient-gold px-8 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
          >
            Explore Other Properties
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
