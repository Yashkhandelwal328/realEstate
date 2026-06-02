"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Home,
  Ruler,
  Phone,
  MessageCircle,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
  Sparkles,
  Building2,
  CheckCircle2,
  Navigation,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ParsedPropertyJson } from "@/lib/jsonParser";

const PHONE = "+91 96390 14150";
const PHONE_DIGITS = "919639014150";

const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%230F0F1E'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='24' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";

const amenityIcons: Record<string, typeof Sparkles> = {
  garden: Sparkles,
  parking: Building2,
  security: Building2,
  pool: Sparkles,
  gym: Sparkles,
  lift: Building2,
  default: Sparkles,
};

function getAmenityIcon(name: string) {
  const key = name.toLowerCase().trim();
  for (const [k, icon] of Object.entries(amenityIcons)) {
    if (key.includes(k)) return icon;
  }
  return amenityIcons.default;
}

export function PropertyPageClient({ property }: { property: any }) {
  const images = property.images.length > 0 ? property.images : [PLACEHOLDER_IMG];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Gallery carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lifestyleSections = property.lifestyleSections || [];
  const floorPlans = property.floorPlans || [];
  const connectivity = property.connectivity || [];
  const highlights = property.highlights || [];

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative pt-20">
        <div className="relative h-[50vh] md:h-[75vh] overflow-hidden">
          <img
            src={images[0]}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-[#050510]/60 to-transparent" />

          {/* Back button */}
          <div className="absolute top-6 left-4 z-10">
            <Link
              href="/#locations"
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-sm text-white shadow-lg hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back
            </Link>
          </div>

          {/* Hero content overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-x-0 bottom-0 p-6 md:p-12"
          >
            <div className="container mx-auto max-w-6xl">
              {property.isFeatured && (
                <span className="inline-block mb-3 font-label text-[10px] text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 uppercase tracking-wider">
                  ★ Premium Listing
                </span>
              )}
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground drop-shadow-lg">
                {property.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-2 text-sm">
                  <MapPin className="size-4 text-primary" />
                  {property.location}{property.city ? `, ${property.city}` : ""}
                </span>
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-2 text-sm">
                  <Home className="size-4 text-primary" />
                  {property.type}
                </span>
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-2 text-sm">
                  <Ruler className="size-4 text-primary" />
                  {property.dimensions}
                </span>
              </div>
              <div className="mt-6">
                <span className="font-display text-3xl md:text-5xl text-gradient-gold">
                  {property.price}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Highlights Bar ── */}
      {highlights.length > 0 && (
        <div className="border-b border-primary/10 bg-card/30 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 max-w-6xl overflow-x-auto">
            <div className="flex items-center gap-6 whitespace-nowrap text-sm text-muted-foreground">
              {highlights.map((hl: string, i: number) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Property Info Section ── */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Overview
              </h2>
              <div className="prose prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
                <p className="whitespace-pre-line text-lg">{property.description}</p>
              </div>
              
              {property.overviewImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 rounded-2xl overflow-hidden border border-primary/10 shadow-xl"
                >
                  <img 
                    src={property.overviewImage} 
                    alt="Property Overview" 
                    className="w-full h-auto object-cover max-h-[500px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="glass rounded-3xl p-8 space-y-6 sticky top-24 shadow-elegant border border-primary/10">
                <h3 className="font-display text-2xl text-primary">
                  Property Facts
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Home className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-label text-[10px] text-muted-foreground uppercase tracking-widest">Type</p>
                      <p className="text-base text-foreground font-medium">{property.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Ruler className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-label text-[10px] text-muted-foreground uppercase tracking-widest">Size / BHK</p>
                      <p className="text-base text-foreground font-medium">{property.dimensions}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-label text-[10px] text-muted-foreground uppercase tracking-widest">Location</p>
                      <p className="text-base text-foreground font-medium">{property.location}</p>
                    </div>
                  </div>
                  {property.reraNumber && (
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-label text-[10px] text-muted-foreground uppercase tracking-widest">RERA No.</p>
                        <p className="text-sm text-foreground font-medium">{property.reraNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-6 border-t border-primary/15">
                  <Button asChild className="w-full bg-gradient-gold text-primary-foreground shadow-glow py-6 text-lg rounded-xl">
                    <a href="#contact">Contact for Details</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Cinematic Lifestyle Sections ── */}
      {lifestyleSections.length > 0 && (
        <section className="relative py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-display text-3xl md:text-5xl text-center mb-16">
              The <span className="text-gradient-gold">Lifestyle</span>
            </h2>
            
            <div className="space-y-24">
              {lifestyleSections.map((sec: any, idx: number) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col gap-10 lg:gap-16 items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="w-full md:w-1/2">
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                        <img 
                          src={sec.image || PLACEHOLDER_IMG} 
                          alt={sec.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                          }}
                        />
                        <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 space-y-6">
                      <h3 className="font-display text-3xl md:text-4xl text-foreground">
                        {sec.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {sec.description}
                      </p>
                      {sec.amenitiesIncluded && sec.amenitiesIncluded.length > 0 && (
                        <div className="pt-4 border-t border-primary/10">
                          <p className="font-label text-xs text-primary mb-4 uppercase tracking-wider">Includes</p>
                          <div className="flex flex-wrap gap-3">
                            {sec.amenitiesIncluded.map((amenity: string, i: number) => (
                              <span key={i} className="inline-flex items-center gap-2 bg-card/50 border border-primary/10 rounded-full px-4 py-2 text-sm">
                                <Sparkles className="size-3 text-primary" /> {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Floor Plans Section ── */}
      {floorPlans.length > 0 && (
        <section className="relative py-20 bg-card/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">
              Floor <span className="text-gradient-gold">Plans</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {floorPlans.map((fp: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-6 border border-primary/10 hover:border-primary/40 transition-colors"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-6">
                    <img 
                      src={fp.image || PLACEHOLDER_IMG} 
                      alt={fp.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="font-display text-xl mb-1">{fp.title}</h4>
                  <p className="text-primary font-medium">{fp.area}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Connectivity & Location Advantages ── */}
      {connectivity.length > 0 && (
        <section className="relative py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 md:p-12 border border-primary/10 text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl mb-8">
                Location <span className="text-gradient-gold">Advantages</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-left">
                {connectivity.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Navigation className="size-4 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Image Gallery Section (Standard Carousel) ── */}
      {property.images.length > 1 && (
        <section className="relative py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-display text-2xl md:text-4xl text-center mb-10">
              Property <span className="text-gradient-gold">Gallery</span>
            </h2>

            {/* Carousel */}
            <div className="relative">
              <div ref={emblaRef} className="overflow-hidden rounded-3xl">
                <div className="flex">
                  {property.images.map((img: string, i: number) => (
                    <div
                      key={i}
                      className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 px-3"
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(i)}
                        className="block w-full aspect-[4/3] rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/40 transition-colors cursor-pointer group"
                      >
                        <img
                          src={img}
                          alt={`${property.title} - Image ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 text-white drop-shadow-md bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity">View Full</span>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              <button
                type="button"
                onClick={scrollPrev}
                className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 size-12 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary backdrop-blur transition hover:bg-primary hover:text-primary-foreground shadow-glass"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 size-12 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary backdrop-blur transition hover:bg-primary hover:text-primary-foreground shadow-glass"
              >
                <ChevronRight className="size-6" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {property.images.map((_: any, i: number) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === selectedIndex
                        ? "bg-primary w-8 shadow-glow"
                        : "bg-primary/20 hover:bg-primary/50 w-2.5"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Contact CTA Section ── */}
      <section id="contact" className="relative py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-16 text-center border-t border-primary/30 relative overflow-hidden"
          >
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="font-display text-3xl md:text-5xl mb-4 relative z-10">
              Schedule a VIP <span className="text-gradient-gold">Tour</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto relative z-10">
              Experience the luxury firsthand. Connect with our premium property advisors today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
              <Button
                asChild
                size="lg"
                className="bg-gradient-gold text-primary-foreground rounded-full shadow-glow h-14 px-8 text-lg"
              >
                <a href={`tel:${property.contactPhone || PHONE_DIGITS}`}>
                  <Phone className="size-5 mr-2" /> Call Advisor
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-green-500/50 text-green-400 hover:bg-green-500/10 h-14 px-8 text-lg"
              >
                <a
                  href={`https://wa.me/${property.contactWhatsapp || PHONE_DIGITS}?text=${encodeURIComponent(
                    `Hi, I'm interested in "${property.title}" (${property.price}) in ${property.location}. Can we schedule a visit?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-5 mr-2" /> WhatsApp Fast-Track
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Mobile Contact Bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex bg-[#0A0A15]/95 backdrop-blur-md border-t border-primary/20">
          <a
            href={`tel:${property.contactPhone || PHONE_DIGITS}`}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Phone className="size-5 text-primary" /> Call
          </a>
          <div className="w-px bg-primary/20" />
          <a
            href={`https://wa.me/${property.contactWhatsapp || PHONE_DIGITS}?text=${encodeURIComponent(
              `Hi, I'm interested in "${property.title}" in ${property.location}.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors"
          >
            <MessageCircle className="size-5 text-green-400" /> WhatsApp
          </a>
          <div className="w-px bg-primary/20" />
          <a
            href="#contact"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Mail className="size-5 text-primary" /> Enquire
          </a>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 size-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors hover:scale-105"
            >
              <X className="size-6" />
            </button>

            {/* Prev/Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex - 1 + property.images.length) %
                    property.images.length
                );
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 size-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors hover:scale-105"
            >
              <ChevronLeft className="size-8" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex + 1) % property.images.length
                );
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 size-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors hover:scale-105"
            >
              <ChevronRight className="size-8" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={property.images[lightboxIndex]}
              alt={`${property.title} - Image ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
              }}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium tracking-widest text-white/70 bg-black/50 px-4 py-2 rounded-full">
              {lightboxIndex + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-20 md:hidden" />
    </>
  );
}
