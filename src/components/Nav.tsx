"use client";
import { useEffect, useState } from "react";
import { Menu, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#locations", label: "Locations" },
  { href: "#partners", label: "Partners" },
  { href: "#gallery", label: "Posters and stuff" },
  { href: "#contact", label: "Contact" },
];

const WHATSAPP = "https://wa.me/919999999999?text=Hi%20Khandelwal%20Real%20Estate";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
        <div className="h-full bg-gradient-gold transition-[width]" style={{ width: `${progress}%` }} />
      </div>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-elegant" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">

            <div className="leading-tight">
              <div className="font-display text-xl text-foreground">Khandelwal</div>
              <div className="font-label text-[10px] text-primary -mt-0.5">Real Estate</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-foreground/80 hover:text-primary transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary group-hover:w-full transition-all" />
              </a>
            ))}
            <Button asChild className="bg-gradient-gold text-primary-foreground hover:opacity-90 rounded-full shadow-glow">
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> WhatsApp
              </a>
            </Button>
          </nav>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-primary/20">
              <SheetTitle className="font-display text-2xl text-primary">Menu</SheetTitle>
              <div className="mt-6 flex flex-col gap-4">
                {links.map((l) => (
                  <a key={l.href} href={l.href} className="text-lg text-foreground hover:text-primary">
                    {l.label}
                  </a>
                ))}
                <Button asChild className="bg-gradient-gold text-primary-foreground mt-4">
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    <MessageCircle className="size-4" /> WhatsApp Us
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
