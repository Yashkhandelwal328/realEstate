import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PHONE = "+91 99999 99999";
const PHONE_DIGITS = "919999999999";
const EMAIL = "info@khandelwalrealestate.in";
const ADDRESS = "Anand Dham, Near Income Tax Office, NH-19, Mathura";

export function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Property enquiry from " + (form.name || "Website"));
    const body = encodeURIComponent(`Name: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`);
    window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`);
    const wa = encodeURIComponent(`Hi, I'm ${form.name} (${form.phone}). ${form.message}`);
    window.open(`https://wa.me/${PHONE_DIGITS}?text=${wa}`, "_blank");
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Begin Your Journey</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Let's Find Your <span className="text-gradient-gold">Home in Braj</span></h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="font-label text-[10px] text-primary">Your Name</label>
              <Input required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="mt-2 bg-background/40 border-primary/30" />
            </div>
            <div>
              <label className="font-label text-[10px] text-primary">Phone</label>
              <Input required maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." className="mt-2 bg-background/40 border-primary/30" />
            </div>
            <div>
              <label className="font-label text-[10px] text-primary">Message</label>
              <Textarea required maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What kind of property are you looking for?" className="mt-2 bg-background/40 border-primary/30" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-gold text-primary-foreground rounded-full shadow-glow">
              <Send className="size-4" /> Send Enquiry
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="rounded-2xl overflow-hidden gold-border h-[260px]">
              <iframe
                title="Khandelwal Real Estate location"
                src="https://www.google.com/maps?q=Income+Tax+Office+NH-19+Mathura&output=embed"
                className="w-full h-full grayscale-[20%]"
                loading="lazy"
              />
            </div>
            <a href={`tel:${PHONE_DIGITS}`} className="flex items-center gap-4 glass rounded-xl p-5 hover:shadow-glow transition-shadow">
              <div className="size-11 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground"><Phone className="size-5" /></div>
              <div><div className="font-label text-[10px] text-primary">Call</div><div className="text-foreground">{PHONE}</div></div>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 glass rounded-xl p-5 hover:shadow-glow transition-shadow">
              <div className="size-11 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground"><Mail className="size-5" /></div>
              <div><div className="font-label text-[10px] text-primary">Email</div><div className="text-foreground">{EMAIL}</div></div>
            </a>
            <div className="flex items-start gap-4 glass rounded-xl p-5">
              <div className="size-11 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground"><MapPin className="size-5" /></div>
              <div><div className="font-label text-[10px] text-primary">Visit</div><div className="text-foreground">{ADDRESS}</div></div>
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href={`https://wa.me/${PHONE_DIGITS}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-gradient-gold text-primary-foreground flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="size-6" />
      </a>
    </section>
  );
}
