"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
const images = Array.from({ length: 7 }, (_, i) => ({
  src: `/posters/${i + 1}.jpeg`,
  alt: `Poster ${i + 1}`,
}));

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-28 bg-gradient-royal">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Gallery</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            <span className="text-gradient-gold">Posters</span> and stuff
          </h2>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
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

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl bg-background border-primary/30 p-2">
          <DialogTitle className="sr-only">Gallery image</DialogTitle>
          {open && (
            <img src={open} alt="Gallery enlarged" className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
