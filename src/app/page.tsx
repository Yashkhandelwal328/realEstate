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

import prisma from "@/lib/db";

export default async function Home() {
  const properties = await prisma.property.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Locations properties={properties} />
      <WhyUs />
      <Partners />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
