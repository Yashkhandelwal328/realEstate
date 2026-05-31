import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import v0 from "@/assets/vrindavan/v0.png";
import vp1 from "@/assets/vrindavan/vp1.png";
import vp2 from "@/assets/vrindavan/vp2.png";
import vp3 from "@/assets/vrindavan/vp3.png";
import vp4 from "@/assets/vrindavan/vp4.png";
import vp5 from "@/assets/vrindavan/vp5.png";
import v5 from "@/assets/vrindavan/v5.jpg";
import v6 from "@/assets/vrindavan/v6.jpg";
import k2 from "@/assets/krishna/k2.jpg";
import k4 from "@/assets/krishna/k4.png";
import k5 from "@/assets/krishna/k5.png";

const images = [
  { src: v0, alt: "Vrindavan view" },
  { src: vp1, alt: "Vrindavan architecture" },
  { src: k2, alt: "Krishna devotional art" },
  { src: vp2, alt: "Vrindavan ghats" },
  { src: v5, alt: "Vrindavan street" },
  { src: vp3, alt: "Vrindavan temple" },
  { src: k4, alt: "Krishna painting" },
  { src: vp4, alt: "Vrindavan sunset" },
  { src: v6, alt: "Vrindavan heritage" },
  { src: vp5, alt: "Vrindavan landscape" },
  { src: k5, alt: "Krishna divine art" },
];

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative py-28 bg-gradient-royal">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Glimpses of Braj</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">A <span className="text-gradient-gold">Visual</span> Pilgrimage</h2>
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
              <img src={img.src} alt={img.alt} className="w-full transition-transform duration-700 group-hover:scale-110" />
            </motion.button>
          ))}
        </div>
      </div>
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl bg-background border-primary/30 p-2">
          <DialogTitle className="sr-only">Gallery image</DialogTitle>
          {open && <img src={open} alt="Gallery enlarged" className="w-full h-auto rounded-lg" />}
        </DialogContent>
      </Dialog>
    </section>
  );
}
