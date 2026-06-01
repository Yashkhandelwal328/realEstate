import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { LeadPopup } from "@/components/LeadPopup";
import { About } from "@/components/sections/About";
import { Locations } from "@/components/sections/Locations";
import { WhyUs } from "@/components/sections/WhyUs";
import { Partners } from "@/components/sections/Partners";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

import prisma from "@/lib/db";

import { getPosters } from "@/app/actions/posters";

export default async function Home() {
  const properties = await prisma.property.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: "desc" },
  });
  
  const posters = await getPosters();

  return (
    <main className="overflow-x-hidden">
      <LeadPopup />
      <Nav />
      <Hero />
      <About />
      <Locations properties={properties} />
      <WhyUs />
      <Partners />
      <Testimonials />
      <Gallery posters={posters} />
      <Contact />
      <Footer />
    </main>
  );
}
