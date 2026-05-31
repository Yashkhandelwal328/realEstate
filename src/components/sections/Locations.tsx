import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, LandPlot, Building2, Home, Store } from "lucide-react";
import vrindavan from "@/assets/vrindavan/v2.jpg";
import mathura from "@/assets/mathura.jpg";
import barsana from "@/assets/barsana.jpg";
import goverdhan from "@/assets/goverdhan.jpg";

const locations = [
  { name: "Vrindavan", img: vrindavan, tag: "Land of Eternal Leela" },
  { name: "Mathura", img: mathura, tag: "Birthplace of Krishna" },
  { name: "Barsana", img: barsana, tag: "Abode of Shri Radha" },
  { name: "Govardhan", img: goverdhan, tag: "The Sacred Hill" },
];

const services = [
  { icon: LandPlot, title: "Plots", desc: "Riverside, township and farmland plots with clear titles across the Braj region." },
  { icon: Building2, title: "Flats", desc: "Modern 2/3/4 BHK apartments in gated communities near temple corridors." },
  { icon: Home, title: "Villas", desc: "Luxury independent villas with private gardens and devotional design touches." },
  { icon: Store, title: "Commercial", desc: "High-footfall shops, showrooms and investment-grade commercial spaces." },
];

const propertyOptions: Record<string, Record<string, { title: string; subtitle: string; details: string }[]>> = {
  Vrindavan: {
    Plots: [
      { title: "Riverfront Plot", subtitle: "26 Gunta", details: "Sacred riverside plot with direct access to the Yamuna and title-verified papers." },
      { title: "Temple View Plot", subtitle: "18 Gunta", details: "Prime plot near Krishna Bhavan with panoramic temple views and quiet surroundings." },
      { title: "Garden Plot", subtitle: "22 Gunta", details: "Private green parcel near heritage gardens, perfect for a spiritual home." },
    ],
    Flats: [
      { title: "Skyline 2 BHK", subtitle: "Govind Dham", details: "Well-ventilated apartment with premium finishes and devotional community amenities." },
      { title: "Sacred 3 BHK", subtitle: "Radha Vatika", details: "Spacious family flat with river-facing balcony and secure gated entry." },
      { title: "Heritage 4 BHK", subtitle: "Shri Krishna Enclave", details: "Luxury flat with temple-style interiors and modern conveniences." },
    ],
    Villas: [
      { title: "Krishna Villa", subtitle: "Devotion Court", details: "Independent villa with private courtyard, pooja room, and tranquil landscaping." },
      { title: "Yamuna Villa", subtitle: "Lotus Estate", details: "Luxury villa close to the Ghats with contemporary design and devotional accents." },
      { title: "Radha Villa", subtitle: "Ananda Greens", details: "Spacious villa ideal for family living with meditation garden and premium fixtures." },
    ],
    Commercial: [
      { title: "Pilgrim Shop", subtitle: "Temple Road", details: "High-footfall storefront ideal for puja supplies and local retail." },
      { title: "Cafe Space", subtitle: "Market Square", details: "Ready-to-use commercial unit with visibility to tourists and devotees." },
      { title: "Office Unit", subtitle: "Braj Business Hub", details: "Workspace with modern facilities and easy access to the city center." },
    ],
  },
  Mathura: {
    Plots: [
      { title: "Heritage Plot", subtitle: "Shri Krishna Nagar", details: "Plot near the Kunti Kund with temple-facing access and clear documentation." },
      { title: "Family Plot", subtitle: "Vishram Ghat", details: "Secure plot close to historic ghats and local amenities." },
      { title: "Gem Plot", subtitle: "Radha Bagh", details: "Premium plot in a devotional enclave with serene surroundings." },
    ],
    Flats: [
      { title: "Classic 2 BHK", subtitle: "Braja Heights", details: "Affordable apartment near Navratan Mandir with modern interiors." },
      { title: "Premium 3 BHK", subtitle: "Mathura Residency", details: "Family flat with large living areas and secure parking." },
      { title: "Executive 4 BHK", subtitle: "Golok Dham", details: "Luxury residence with contemporary amenities and devotional landscaping." },
    ],
    Villas: [
      { title: "Lotus Villa", subtitle: "Shyam Vihar", details: "Private villa that blends devotion with modern comfort in a gated community." },
      { title: "Bloom Villa", subtitle: "Gita Greens", details: "Elegant villa with garden space and premium fixtures." },
      { title: "Serene Villa", subtitle: "Radha Kunj", details: "Spacious independent villa ideal for peaceful family living." },
    ],
    Commercial: [
      { title: "Bazaar Shop", subtitle: "Old City", details: "Retail unit in the heart of the historic market district." },
      { title: "Service Outlet", subtitle: "High Street", details: "Premium space for hospitality, retail, or consultancy services." },
      { title: "Office Suite", subtitle: "Riverfront Tower", details: "Modern office ready for consultants, agents, or startups." },
    ],
  },
  Barsana: {
    Plots: [
      { title: "Radha Plot", subtitle: "Muralidhara Estate", details: "Peaceful plot in Barsana with temple proximity and divine energy." },
      { title: "Heritage Plot", subtitle: "Shri Shyama Kunj", details: "Traditional plot with easy access to pilgrimage routes." },
      { title: "Green Plot", subtitle: "Vrindavan Farms", details: "Agricultural plot with spiritual ambience and investment potential." },
    ],
    Flats: [
      { title: "Temple View 2 BHK", subtitle: "Barsana Heights", details: "Modern apartment close to the famous Radha Rani temple." },
      { title: "Sacred 3 BHK", subtitle: "Gopis Court", details: "Family flat with devotional design and warm lighting." },
      { title: "Divine 4 BHK", subtitle: "Rasbihari Residency", details: "Luxury flat for families who want comfort and spirituality." },
    ],
    Villas: [
      { title: "Village Villa", subtitle: "Shyama Vatika", details: "Cozy independent villa with private courtyard and garden." },
      { title: "Queen’s Villa", subtitle: "Radha Kunj", details: "Elegant villa with devotional architecture." },
      { title: "Serenity Villa", subtitle: "Vrindavan Estates", details: "Tranquil villa with modern amenities and spacious rooms." },
    ],
    Commercial: [
      { title: "Pilgrim Shop", subtitle: "Temple Lane", details: "Retail outlet ideal for religious gifts and crafts." },
      { title: "Cafe Shop", subtitle: "Main Square", details: "Eatery space with devotional guests and steady foot traffic." },
      { title: "Studio Space", subtitle: "Arts Lane", details: "Commercial unit for workshops, music, or crafts." },
    ],
  },
  Govardhan: {
    Plots: [
      { title: "Hillview Plot", subtitle: "Govardhan Heights", details: "Plot with scenic views of the sacred Govardhan hill." },
      { title: "Temple Plot", subtitle: "Giriraj Enclave", details: "Ideal plot close to the hill and pilgrimage paths." },
      { title: "Forest Plot", subtitle: "Dham Gardens", details: "Quiet plot surrounded by greenery and devotional energy." },
    ],
    Flats: [
      { title: "Pilgrim Flat", subtitle: "Giriraj Towers", details: "Comfortable flat for devotees visiting Govardhan hill." },
      { title: "Hilltop 3 BHK", subtitle: "Mukti Residency", details: "Apartment with beautiful hill views and modern design." },
      { title: "Luxury 4 BHK", subtitle: "Govardhan Greens", details: "Spacious family flat with premium amenities." },
    ],
    Villas: [
      { title: "Hill Villa", subtitle: "Sacred Grove", details: "Luxury villa with private garden near the hill." },
      { title: "Meadow Villa", subtitle: "Kripa Gardens", details: "Elegant villa with devotional outdoor living." },
      { title: "Peace Villa", subtitle: "Giriraj Residences", details: "Calm villa for family retreats and meditation." },
    ],
    Commercial: [
      { title: "Hill Shop", subtitle: "Market Road", details: "Retail space near pilgrims for souvenirs and gifts." },
      { title: "Wellness Space", subtitle: "Dham Arcade", details: "Commercial unit for yoga, Ayurveda or retreat services." },
      { title: "Office Floor", subtitle: "Braj Business Center", details: "Professional workspace in a devotional destination." },
    ],
  },
};

export function Locations() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const currentOptions = selectedLocation && selectedService
    ? propertyOptions[selectedLocation]?.[selectedService] ?? []
    : [];

  return (
    <section id="locations" className="relative py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-label text-xs text-primary">Only Locations</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Sacred <span className="text-gradient-gold">Addresses</span> of Braj</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            First choose a destination, then select the property service you need, and finally compare the best options available.
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
            2. Choose Service
          </button>
          <button
            type="button"
            className="rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!selectedService}
          >
            3. View Options
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
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {locations.map((location, i) => (
                <motion.button
                  key={location.name}
                  type="button"
                  onClick={() => {
                    setSelectedLocation(location.name);
                    setSelectedService(null);
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group relative h-[440px] overflow-hidden rounded-2xl border border-primary/10 bg-black/30 text-left shadow-elegant transition hover:border-primary/60"
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
                    <h3 className="font-display text-3xl text-foreground">{location.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{location.tag}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : !selectedService ? (
            <motion.div
              key="service-step"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10 rounded-3xl border border-primary/20 bg-background/80 p-8 text-center shadow-elegant">
                <button
                  type="button"
                  onClick={() => setSelectedLocation(null)}
                  className="text-sm text-primary underline transition hover:text-primary/80"
                >
                  ← Change Location
                </button>
                <h3 className="mt-4 font-display text-3xl md:text-4xl text-foreground">Selected: {selectedLocation}</h3>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  Now choose the type of service you want in {selectedLocation}. After that, we’ll show you the best property options available.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, i) => (
                  <motion.button
                    key={service.title}
                    type="button"
                    onClick={() => setSelectedService(service.title)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group relative glass rounded-2xl p-8 text-left transition hover:-translate-y-2 hover:shadow-glow"
                  >
                    <div className="size-14 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground shadow-glow mb-5">
                      <service.icon className="size-6" />
                    </div>
                    <h3 className="font-display text-2xl text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </motion.button>
                ))}
              </div>
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
                    onClick={() => setSelectedService(null)}
                    className="text-sm text-primary underline transition hover:text-primary/80"
                  >
                    ← Back to Services
                  </button>
                  <span className="text-sm text-muted-foreground">Selected Location: {selectedLocation}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl md:text-4xl text-foreground">{selectedService} Options in {selectedLocation}</h3>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  These are the recommended options for your chosen service. Select one to get in touch or learn more.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentOptions.map((option, i) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group glass rounded-3xl border border-primary/10 p-8 shadow-elegant transition hover:-translate-y-2"
                  >
                    <div className="font-label text-xs text-primary uppercase tracking-[0.3em]">{option.subtitle}</div>
                    <h4 className="mt-4 font-display text-2xl text-foreground">{option.title}</h4>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{option.details}</p>
                    <button
                      type="button"
                      onClick={() => window.location.hash = "#contact"}
                      className="mt-6 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                    >
                      Contact Us
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
