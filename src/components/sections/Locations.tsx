import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import vrindavan from "@/assets/vrindavan/v2.jpg";
import mathura from "@/assets/mathura.jpg";
import barsana from "@/assets/barsana.jpg";
import goverdhan from "@/assets/goverdhan.jpg";

const locations = [
  { name: "Vrindavan", img: vrindavan, tag: "Land of Eternal Leela" },
  { name: "Mathura", img: mathura, tag: "Birthplace of Krishna" },
  { name: "Barsana", img: barsana, tag: "Abode of Shri Radha" },
  { name: "Govardhan", img: goverdhan, tag: "The Sacred Hill" },
];

export function Locations() {
  return (
    <section id="locations" className="relative py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Featured Destinations</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Sacred <span className="text-gradient-gold">Addresses</span> of Braj</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {locations.map((l, i) => (
            <motion.a
              href="#contact"
              key={l.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative h-[440px] rounded-2xl overflow-hidden shadow-elegant gold-border"
            >
              <img
                src={l.img}
                alt={`${l.name} — ${l.tag}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <MapPin className="size-4" />
                  <span className="font-label text-[10px]">Braj Bhoomi</span>
                </div>
                <h3 className="font-display text-3xl text-foreground">{l.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{l.tag}</p>
              </div>
              <div className="absolute inset-0 ring-0 ring-primary/0 group-hover:ring-2 group-hover:ring-primary/60 rounded-2xl transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
