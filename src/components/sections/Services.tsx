"use client";
import { motion } from "framer-motion";
import { LandPlot, Building2, Home, Store } from "lucide-react";

const services = [
  { icon: LandPlot, title: "Plots", desc: "Riverside, township and farmland plots with clear titles in Vrindavan & Mathura." },
  { icon: Building2, title: "Flats", desc: "Modern 2/3/4 BHK apartments in gated communities near temple corridors." },
  { icon: Home, title: "Villas", desc: "Luxury independent villas with private gardens and devotional design touches." },
  { icon: Store, title: "Commercial", desc: "High-footfall shops, showrooms and investment-grade commercial spaces." },
];

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">What We Offer</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">A Property for Every <span className="text-gradient-gold">Aspiration</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative glass rounded-2xl p-8 hover:shadow-glow transition-all hover:-translate-y-2"
            >
              <div className="size-14 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground shadow-glow mb-5">
                <s.icon className="size-6" />
              </div>
              <h3 className="font-display text-2xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
