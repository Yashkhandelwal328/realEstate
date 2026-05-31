import { motion } from "framer-motion";
import { SanskritDivider } from "@/components/SanskritDivider";
import v1 from "@/assets/vrindavan/v1.jpg";

const stats = [
  { k: "20+", v: "Years of Trust" },
  { k: "500+", v: "Verified Properties" },
  { k: "1200+", v: "Happy Families" },
];

export function About() {
  return (
    <section id="about" className="relative py-28 bg-black/60">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="ornate-frame max-w-md mx-auto lg:mx-0"
        >
          <img src={v1} alt="Vrindavan temple architecture" className="w-full h-[520px] object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-label text-xs text-primary">About Us</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl text-foreground">
            Rooted in <span className="text-gradient-gold">Devotion</span>, Built on Trust
          </h2>
          <SanskritDivider />
          <p className="text-foreground/90 leading-relaxed">
            Khandelwal Real Estate is the most trusted name for property in Vrindavan, Mathura and the wider Braj region. From sacred riverside plots to luxury villas and modern flats, we curate addresses that honour your spiritual aspirations and your family's future. Every listing is title-verified, every recommendation honest, every transaction transparent.
          </p>
          <p className="mt-4 text-foreground/90 leading-relaxed">
            We don't just sell real estate — we help you find a home in the land of Shri Krishna.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.v} className="glass rounded-xl p-5 text-center">
                <div className="font-display text-3xl text-gradient-gold">{s.k}</div>
                <div className="font-label text-[10px] text-foreground/70 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
