"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitInquiry } from "@/app/actions/inquiry";

export function LeadPopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show if they haven't seen it in this session
    const hasSeen = sessionStorage.getItem("lead-popup-seen");
    if (!hasSeen) {
      const timer = setTimeout(() => setShow(true), 2000); // 2 second delay
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("lead-popup-seen", "true");
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    setLoading(true);
    const res = await submitInquiry({ name, phone });
    setLoading(false);
    
    if (res.success) {
      closePopup();
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-md bg-card border border-primary/20 rounded-2xl shadow-elegant overflow-hidden relative"
          >
            <button 
              onClick={closePopup}
              className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-full bg-background/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl mb-2 text-foreground">Welcome to Braj</h3>
                <p className="text-sm text-muted-foreground">Enter your details and we will help you find your dream property.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-label text-[10px] text-primary uppercase tracking-wider">Full Name</label>
                  <Input 
                    required 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Your Name" 
                    className="mt-1 bg-background" 
                  />
                </div>
                <div>
                  <label className="font-label text-[10px] text-primary uppercase tracking-wider">Phone Number</label>
                  <Input 
                    required 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    placeholder="+91 ..." 
                    className="mt-1 bg-background" 
                  />
                </div>
                
                <div className="pt-2 flex flex-col gap-3">
                  <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground rounded-full shadow-glow">
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                  <button type="button" onClick={closePopup} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4">
                    Skip for now
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
