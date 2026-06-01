"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import _vrindavan from "@/assets/vrindavan/v2.jpg";
import _mathura from "@/assets/mathura.jpg";
import _barsana from "@/assets/barsana.jpg";
import _goverdhan from "@/assets/goverdhan.jpg";

// Next.js static imports return StaticImageData objects; extract string src
const getSrc = (img: { src: string } | string): string =>
  typeof img === "string" ? img : img.src;

const vrindavan = getSrc(_vrindavan as any);
const mathura = getSrc(_mathura as any);
const barsana = getSrc(_barsana as any);
const goverdhan = getSrc(_goverdhan as any);

const locations = [
  { name: "Vrindavan", img: vrindavan, tag: "Land of Eternal Leela" },
  { name: "Mathura", img: mathura, tag: "Birthplace of Krishna" },
  { name: "Barsana", img: barsana, tag: "Abode of Shri Radha" },
  { name: "Govardhan", img: goverdhan, tag: "The Sacred Hill" },
];

export function Locations({ properties = [] }: { properties?: any[] }) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const currentOptions = selectedLocation
    ? properties.filter(p => p.location.toLowerCase() === selectedLocation.toLowerCase())
    : [];

  return (
    <section id="locations" className="relative py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Only Locations</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Sacred <span className="text-gradient-gold">Addresses</span> of Braj</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Choose a destination to view all available properties.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            type="button"
            className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary/15"
          >
            1. Choose Location
          </button>
          <button
            type="button"
            className="rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!selectedLocation}
          >
            2. View Options
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!selectedLocation ? (
            <motion.div
              key="location-step"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
            >
              {locations.map((location, i) => (
                <motion.button
                  key={location.name}
                  type="button"
                  onClick={() => setSelectedLocation(location.name)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group relative h-[240px] md:h-[440px] overflow-hidden rounded-2xl border border-primary/10 bg-black/30 text-left shadow-elegant transition hover:border-primary/60"
                >
                  <img
                    src={location.img}
                    alt={`${location.name} — ${location.tag}`}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <MapPin className="size-4" />
                      <span className="font-label text-[10px]">Braj Bhoomi</span>
                    </div>
                    <h3 className="font-display text-xl md:text-3xl text-foreground">{location.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{location.tag}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="options-step"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10 rounded-3xl border border-primary/20 bg-background/80 p-8 text-center shadow-elegant">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedLocation(null)}
                    className="text-sm text-primary underline transition hover:text-primary/80"
                  >
                    ← Back to Locations
                  </button>
                  <span className="text-sm text-muted-foreground">Selected Location: {selectedLocation}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl md:text-4xl text-foreground">Properties in {selectedLocation}</h3>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  These are the recommended options for your chosen location.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentOptions.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No properties available in this location currently.
                  </div>
                ) : (
                  currentOptions.map((option, i) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="group glass rounded-3xl border border-primary/10 p-8 shadow-elegant transition hover:-translate-y-2 flex flex-col"
                    >
                      {option.images && option.images.length > 0 && (
                        <div className="mb-4 -mx-4 -mt-4 overflow-hidden rounded-t-2xl">
                          <img src={option.images[0]} alt={option.title} className="w-full h-48 object-cover" />
                        </div>
                      )}
                      <div className="font-label text-xs text-primary uppercase tracking-[0.3em] flex justify-between items-center">
                        <span>{option.dimensions}</span>
                        <span>{option.type}</span>
                      </div>
                      <h4 className="mt-4 font-display text-2xl text-foreground">{option.title}</h4>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-grow">{option.description}</p>
                      <div className="mt-4 text-lg font-semibold text-primary">{option.price}</div>
                      
                      {option.gmapsUrl && (
                        <div className="mt-4">
                          <iframe
                            src={option.gmapsUrl}
                            width="100%"
                            height="150"
                            style={{ border: 0, borderRadius: '8px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => window.location.hash = "#contact"}
                        className="mt-6 inline-flex justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                      >
                        Contact Us
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
