import { Facebook, Instagram, MessageCircle, Mail } from "lucide-react";
import logo from "@/assets/logo.jpeg";

export function Footer() {
  return (
    <footer className="relative pt-20 pb-8 bg-gradient-royal border-t border-primary/20">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Khandelwal Real Estate" className="size-12 rounded-full ring-1 ring-primary/50 object-cover" />
            <div>
              <div className="font-display text-xl">Khandelwal</div>
              <div className="font-label text-[10px] text-primary -mt-0.5">Real Estate</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Radhe Radhe 🙏 — Properties blessed by Braj, curated with devotion.</p>
        </div>
        <div>
          <div className="font-label text-xs text-primary mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#about" className="hover:text-primary">About</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#locations" className="hover:text-primary">Locations</a></li>
            <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
          </ul>
        </div>
        <div>
          <div className="font-label text-xs text-primary mb-4">Partners</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Gangotri · Anantam</li>
            <li>Hare Krishna Ashiyana</li>
            <li>Shri Divine Group</li>
            <li>Shri Group · Omaxe</li>
          </ul>
        </div>
        <div>
          <div className="font-label text-xs text-primary mb-4">Connect</div>
          <p className="text-sm text-muted-foreground">Anand Dham, NH-19, Mathura</p>
          <p className="text-sm text-muted-foreground mt-1">info@khandelwalrealestate.in</p>
          <div className="mt-4 flex gap-3">
            <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="size-10 rounded-full glass flex items-center justify-center hover:text-primary"><MessageCircle className="size-4" /></a>
            <a href="#" className="size-10 rounded-full glass flex items-center justify-center hover:text-primary"><Facebook className="size-4" /></a>
            <a href="#" className="size-10 rounded-full glass flex items-center justify-center hover:text-primary"><Instagram className="size-4" /></a>
            <a href="mailto:info@khandelwalrealestate.in" className="size-10 rounded-full glass flex items-center justify-center hover:text-primary"><Mail className="size-4" /></a>
          </div>
        </div>
      </div>
      <div className="mt-14 pt-6 border-t border-primary/15 text-center">
        <p className="font-display text-lg text-gradient-gold italic">"Wherever Krishna is, there is victory, fortune and morality." — Bhagavad Gita</p>
        <p className="mt-3 text-xs text-muted-foreground">© {new Date().getFullYear()} Khandelwal Real Estate · All rights reserved</p>
      </div>
    </footer>
  );
}
