"use client";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/Particles";
import _krishna from "@/assets/krishna/k.png";
import _krishnaMobile from "@/assets/krishna/mob_bg.png";

// Next.js static imports return a StaticImageData object; extract the string src
const krishna = typeof _krishna === "string" ? _krishna : (_krishna as any).src;
const krishnaMobile = typeof _krishnaMobile === "string" ? _krishnaMobile : (_krishnaMobile as any).src;

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden pt-24">
      <Particles />
      {/* gold radial */}
      <div className="absolute -right-40 top-1/3 size-[600px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -left-40 bottom-0 size-[400px] rounded-full bg-secondary/30 blur-3xl" />

      <div className="container relative mx-auto grid lg:grid-cols-2 gap-12 items-center px-4 py-16">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
          className="relative z-10"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 mb-6"
          >
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label text-xs text-primary">Vrindavan · Mathura · Braj</span>
          </motion.div>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground"
          >
            Find Your <span className="text-gradient-gold italic">Dream Property</span> in the Sacred Land of Braj
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-6 text-lg text-muted-foreground max-w-xl"
          >
            Curated plots, villas and luxury homes in Vrindavan and Mathura — where devotion meets a discerning lifestyle. Trusted partners. Verified titles. Generational value.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="bg-gradient-gold text-primary-foreground hover:opacity-90 rounded-full shadow-glow">
              <a href="#locations">Explore Properties <ArrowRight className="size-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary/40 text-foreground hover:bg-primary/10">
              <a href="#contact"><MapPin className="size-4" /> Contact Us</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full text-foreground hover:bg-accent/20">
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative h-[460px] md:h-[600px]"
        >
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden ornate-frame animate-float-y">
            {/* Desktop Image */}
            <img src={krishna} alt="Lord Krishna divine art" className="hidden md:block w-full h-full object-cover" />
            {/* Mobile Image */}
            <img src={krishnaMobile} alt="Lord Krishna divine art" className="block md:hidden w-full h-full object-contain" />
          </div>
        </motion.div>
      </div>

      {/* temple silhouette */}
      <svg className="absolute bottom-0 left-0 right-0 w-full text-primary/15" viewBox="0 0 1200 120" fill="currentColor" preserveAspectRatio="none">
        <path d="M0 120 L0 90 L120 90 L130 70 L150 70 L150 50 L160 30 L170 50 L170 70 L190 70 L200 90 L300 90 L310 60 L330 60 L340 30 L350 10 L360 30 L370 60 L390 60 L400 90 L600 90 L610 50 L630 50 L640 20 L650 0 L660 20 L670 50 L690 50 L700 90 L900 90 L910 70 L930 70 L940 40 L950 20 L960 40 L970 70 L990 70 L1000 90 L1200 90 L1200 120 Z" />
      </svg>

      <a href="#about" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-primary animate-bounce">
        <ChevronDown className="size-6" />
      </a>
    </section>
  );
}
