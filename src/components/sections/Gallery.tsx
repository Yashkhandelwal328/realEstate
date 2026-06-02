"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
export function Gallery({ posters = [] }: { posters?: string[] }) {
  const [open, setOpen] = useState<string | null>(null);

  // Fallback to empty if no posters provided
  const displayPosters = posters.length > 0 
    ? posters.map(p => ({ src: p, alt: "Poster" })) 
    : [];

  return (
    <section id="gallery" className="relative py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Gallery</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            <span className="text-gradient-gold">Posters</span> and stuff
          </h2>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {displayPosters.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
              onClick={() => setOpen(img.src)}
              className="block w-full mb-4 break-inside-avoid overflow-hidden rounded-xl gold-border group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full transition-transform duration-700 group-hover:scale-110"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute top-6 right-6 size-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors hover:scale-105"
            >
              <X className="size-6" />
            </button>

            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={open}
              alt="Gallery enlarged"
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
