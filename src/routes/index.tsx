import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Locations } from "@/components/sections/Locations";
import { WhyUs } from "@/components/sections/WhyUs";
import { Partners } from "@/components/sections/Partners";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khandelwal Real Estate — Luxury Properties in Vrindavan & Mathura" },
      { name: "description", content: "Find your dream property in the sacred land of Braj. Trusted plots, villas, flats and commercial spaces in Vrindavan and Mathura — title-verified and devotionally curated." },
      { property: "og:title", content: "Khandelwal Real Estate — Vrindavan & Mathura Luxury Properties" },
      { property: "og:description", content: "Curated plots, villas and homes in the sacred land of Braj." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Locations />
      <WhyUs />
      <Partners />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
