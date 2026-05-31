import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { q: "Khandelwal ji guided us to a beautiful plot near Banke Bihari. Honest, patient, and deeply knowledgeable.", n: "Sharma Family", c: "Vrindavan" },
  { q: "Our dream villa, with the Yamuna just a walk away. The team handled every detail — registry to possession.", n: "Anita & Rohit Gupta", c: "Mathura" },
  { q: "Best real estate experience we've had. Transparent pricing and verified titles. Radhe Radhe!", n: "Mahesh Agarwal", c: "Delhi" },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Blessings From Our Families</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Words of <span className="text-gradient-gold">Gratitude</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.figure
              key={t.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 relative"
            >
              <Quote className="size-10 text-primary/70 mb-4" />
              <blockquote className="text-foreground/90 font-display text-lg leading-relaxed">"{t.q}"</blockquote>
              <figcaption className="mt-6 pt-4 border-t border-primary/20">
                <div className="font-display text-lg text-primary">{t.n}</div>
                <div className="font-label text-[10px] text-muted-foreground">{t.c}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
