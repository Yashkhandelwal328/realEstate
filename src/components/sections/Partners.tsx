"use client";
import { motion } from "framer-motion";
import _gangotri from "@/assets/groups/gangotri.jpeg";
import _anantam from "@/assets/groups/anantam.jpeg";
import _hka from "@/assets/groups/hka.jpeg";
import _sdg from "@/assets/groups/sdg.jpeg";
import _sg from "@/assets/groups/sg.jpeg";
import _omaxe from "@/assets/groups/omaxe.jpeg";

// Next.js static imports return StaticImageData objects; extract string src
const getSrc = (img: any): string => (typeof img === "string" ? img : img.src);

const partners = [
  { name: "Gangotri", logo: getSrc(_gangotri) },
  { name: "Anantam", logo: getSrc(_anantam) },
  { name: "Hare Krishna Ashiyana", logo: getSrc(_hka) },
  { name: "Shri Divine Group", logo: getSrc(_sdg) },
  { name: "Shri Group", logo: getSrc(_sg) },
  { name: "Omaxe", logo: getSrc(_omaxe) },
];

export function Partners() {
  return (
    <section id="partners" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[600px] rounded-full bg-accent/15 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Authorised Channel Partners</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Trusted by Leading <span className="text-gradient-gold">Developer Groups</span></h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group glass rounded-xl aspect-square flex items-center justify-center p-4 hover:shadow-glow hover:border-primary/60 transition-all"
              title={p.name}
            >
              <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain rounded-md group-hover:scale-105 transition-transform" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
