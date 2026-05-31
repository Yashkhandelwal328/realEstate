import { motion } from "framer-motion";
import { ShieldCheck, Award, Handshake, Sparkles, Scale, HeartHandshake } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Title Verified", desc: "Every property checked by experienced legal panel before listing." },
  { icon: Award, title: "20+ Years Local", desc: "Decades of presence in Vrindavan and Mathura real estate." },
  { icon: Handshake, title: "Trusted Partners", desc: "Authorised channel partners for leading developer groups." },
  { icon: Scale, title: "Fair Pricing", desc: "Transparent, market-aligned rates — no hidden charges, ever." },
  { icon: Sparkles, title: "Luxury Curation", desc: "Hand-picked listings that honour devotion and modern living." },
  { icon: HeartHandshake, title: "Lifetime Support", desc: "Post-purchase guidance for registry, loans and possession." },
];

export function WhyUs() {
  return (
    <section className="relative py-28 bg-gradient-royal">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-label text-xs text-primary">Why Choose Us</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Devotion in <span className="text-gradient-gold">Detail</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex gap-5 glass rounded-2xl p-6"
            >
              <div className="shrink-0 size-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow text-primary-foreground">
                <f.icon className="size-5" />
              </div>
              <div>
                <h3 className="font-display text-xl">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
