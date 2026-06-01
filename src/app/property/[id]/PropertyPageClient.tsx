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
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PHONE = "+91 96390 14150";
const PHONE_DIGITS = "919639014150";

const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%230F0F1E'%3E%3Crect width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='24' font-family='sans-serif'%3ENo Image%3C/text%3E%3C/svg%3E";

// Map amenity names to icons
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

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  type: string;
  amenities: string[];
  dimensions: string;
  isFeatured: boolean;
  isAvailable: boolean;
  images: string[];
  gmapsUrl: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export function PropertyPageClient({ property }: { property: Property }) {
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

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative pt-20">
        <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
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
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-foreground hover:text-primary transition-colors"
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
            <div className="container mx-auto">
              {property.isFeatured && (
                <span className="inline-block mb-3 font-label text-[10px] text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1">
                  ★ Featured Property
                </span>
              )}
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground">
                {property.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-sm">
                  <MapPin className="size-3.5 text-primary" />
                  {property.location}
                </span>
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-sm">
                  <Home className="size-3.5 text-primary" />
                  {property.type}
                </span>
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-4 py-1.5 text-sm">
                  <Ruler className="size-3.5 text-primary" />
                  {property.dimensions}
                </span>
              </div>
              <div className="mt-5">
                <span className="font-display text-3xl md:text-4xl text-primary">
                  {property.price}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Property Info Section ── */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-2xl md:text-3xl mb-4">
                  About This Property
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </motion.div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="glass rounded-2xl p-6 md:p-8 space-y-5">
                <h3 className="font-display text-xl text-primary">
                  Property Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Home className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-label text-[9px] text-muted-foreground">
                        Type
                      </p>
                      <p className="text-sm text-foreground">{property.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Ruler className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-label text-[9px] text-muted-foreground">
                        Size / BHK
                      </p>
                      <p className="text-sm text-foreground">
                        {property.dimensions}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-label text-[9px] text-muted-foreground">
                        Location
                      </p>
                      <p className="text-sm text-foreground">
                        {property.location}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-primary/15">
                  <p className="font-label text-[9px] text-muted-foreground">
                    Price
                  </p>
                  <p className="font-display text-2xl text-primary">
                    {property.price}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Amenities Section ── */}
      {property.amenities.length > 0 && (
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-2xl md:text-3xl text-center mb-8">
                Amenities & <span className="text-gradient-gold">Features</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {property.amenities.map((amenity, i) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <motion.div
                      key={amenity}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-5 flex items-center gap-3 hover:shadow-glow transition-shadow"
                    >
                      <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{amenity}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Image Gallery Section ── */}
      {property.images.length > 1 && (
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl text-center mb-8">
              Property <span className="text-gradient-gold">Gallery</span>
            </h2>

            {/* Carousel */}
            <div className="relative">
              <div ref={emblaRef} className="overflow-hidden rounded-2xl">
                <div className="flex">
                  {property.images.map((img, i) => (
                    <div
                      key={i}
                      className="min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 px-2"
                    >
                      <button
                        type="button"
                        onClick={() => openLightbox(i)}
                        className="block w-full aspect-[4/3] rounded-xl overflow-hidden border border-primary/10 hover:border-primary/40 transition-colors cursor-pointer"
                      >
                        <img
                          src={img}
                          alt={`${property.title} - Image ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              <button
                type="button"
                onClick={scrollPrev}
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 size-10 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary backdrop-blur transition hover:bg-primary/20"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 size-10 items-center justify-center rounded-full border border-primary/30 bg-background/80 text-primary backdrop-blur transition hover:bg-primary/20"
              >
                <ChevronRight className="size-4" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`size-2.5 rounded-full transition-all duration-300 ${
                      i === selectedIndex
                        ? "bg-primary w-6 rounded-full"
                        : "bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Google Maps ── */}
      {property.gmapsUrl && (
        <section className="relative py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl text-center mb-8">
              Location <span className="text-gradient-gold">Map</span>
            </h2>
            <div className="rounded-2xl overflow-hidden gold-border h-[300px] md:h-[400px]">
              <iframe
                src={property.gmapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${property.title} location on map`}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Contact CTA Section ── */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl mb-3">
              Interested in this Property?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Get in touch with us to schedule a site visit or ask any questions
              about this property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-gold text-primary-foreground rounded-full shadow-glow"
              >
                <a href={`tel:${PHONE_DIGITS}`}>
                  <Phone className="size-4" /> Call Now
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-green-500/50 text-green-400 hover:bg-green-500/10"
              >
                <a
                  href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
                    `Hi, I'm interested in "${property.title}" (${property.price}) in ${property.location}. Can you share more details?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-primary/30 hover:bg-primary/10"
              >
                <a href="/#contact">
                  <Mail className="size-4" /> Enquire
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Mobile Contact Bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
        <div className="flex glass border-t border-primary/20">
          <a
            href={`tel:${PHONE_DIGITS}`}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Phone className="size-4" /> Call
          </a>
          <div className="w-px bg-primary/20" />
          <a
            href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
              `Hi, I'm interested in "${property.title}" in ${property.location}.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors"
          >
            <MessageCircle className="size-4" /> WhatsApp
          </a>
          <div className="w-px bg-primary/20" />
          <a
            href="/#contact"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <Mail className="size-4" /> Enquire
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
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 size-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="size-5" />
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
              className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(
                  (lightboxIndex + 1) % property.images.length
                );
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={property.images[lightboxIndex]}
              alt={`${property.title} - Image ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                (e.target as HTMLImageElement).src = PLACEHOLDER_IMG;
              }}
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {lightboxIndex + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-14 md:hidden" />
    </>
  );
}
