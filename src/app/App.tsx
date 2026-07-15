import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf, ShieldCheck, Droplets, Star, Phone, Mail, MapPin, Clock,
  Menu, X, ChevronDown, LogOut, Package, LayoutDashboard,
  Plus, Edit2, Trash2, Upload, Search, Eye, EyeOff, Check, AlertCircle
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  badge: string;
}

type Page = "home" | "admin-login" | "admin-dashboard";
type AdminView = "dashboard" | "products" | "add-product" | "edit-product";

// ─── Data ────────────────────────────────────────────────────────────────────



const TESTIMONIALS = [
  { name: "Ayesha Malik", city: "Lahore", rating: 5, text: "The Sidr honey is absolutely extraordinary. My family has been buying from Al Shahid for two years and the quality never wavers. Completely trust this brand.", avatar: "AM" },
  { name: "Hassan Ahmed", city: "Karachi", rating: 5, text: "Tried many ghee brands but nothing compares to Al Shahid Desi Ghee. You can taste the purity. Highly recommended to everyone looking for authentic quality.", avatar: "HA" },
  { name: "Fatima Zahra", city: "Islamabad", rating: 5, text: "Their customer service is as good as the products. Ordered dry fruits and they arrived fresh, well-packaged, and exactly as described. Will order again.", avatar: "FZ" },
  { name: "Umar Farooq", city: "Peshawar", rating: 5, text: "The black seed oil quality is exceptional. I've been using it daily for months and the health benefits are real. Natural, pure, and properly packaged.", avatar: "UF" },
];

const WHATSAPP_NUMBER = "+923216643901";

// ─── Utilities ───────────────────────────────────────────────────────────────

const whatsappLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// ─── Shared Components ────────────────────────────────────────────────────────

function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLink("Assalam o Alaikum! I'd like to inquire about your organic products.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ onAdminClick }: { onAdminClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Home", "Products", "About", "Contact"];

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#2E7D32] rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-[#1B5E20] text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                Al Shahid
              </span>
              <span className="block text-[10px] text-[#D4A017] font-medium leading-none tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
                Organics
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className={`text-sm font-medium transition-colors hover:text-[#2E7D32] ${
                    scrolled ? "text-[#222222]" : "text-white"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* WhatsApp Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappLink("Assalam o Alaikum! I'd like to inquire about your organic products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#1da851] transition-colors flex items-center gap-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className={scrolled ? "text-[#222]" : "text-white"} />
            ) : (
              <Menu className={scrolled ? "text-[#222]" : "text-white"} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-[#1B5E20] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35 }}
          >
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-white text-3xl font-bold tracking-wide hover:text-[#D4A017] transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {link}
              </button>
            ))}
            <a
              href={whatsappLink("Assalam o Alaikum!")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-[#25D366] text-white font-semibold px-8 py-3 rounded-full text-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={() => setMobileOpen(false)}
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [dropPos, setDropPos] = useState([
    { x: 15, y: 20 }, { x: 80, y: 15 }, { x: 60, y: 70 }, { x: 25, y: 80 }, { x: 90, y: 55 }
  ]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 40%, #388E3C 70%, #1B5E20 100%)",
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1782087972248-82af30050866?w=1600&h=900&fit=crop&auto=format)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Floating honey drops */}
      {dropPos.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-4 rounded-full opacity-30"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            background: "#D4A017",
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* Leaf decorations */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute opacity-10"
          style={{ left: `${10 + i * 15}%`, top: `${10 + (i % 3) * 30}%` }}
          animate={{ rotate: [0, 15, -15, 0], y: [0, -10, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
        >
          <Leaf className="w-8 h-8 text-white" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-32">
        {/* Text */}
        <div>
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-[#D4A017] text-sm font-medium mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#D4A017] animate-pulse" />
            100% Certified Organic
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Pure Organic{" "}
            <span className="text-[#D4A017]">Goodness</span>{" "}
            From Nature
          </motion.h1>

          <motion.p
            className="text-white/80 text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Fresh, Natural and Chemical-Free Organic Products Delivered With Trust.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#D4A017] text-[#222] font-semibold px-8 py-4 rounded-full hover:bg-[#c4911a] transition-all hover:scale-105 active:scale-95 shadow-lg text-base"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Shop Products
            </button>
            <a
              href={whatsappLink("Assalam o Alaikum! I came from your website and want to know more about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all hover:scale-105 flex items-center justify-center gap-2 text-base"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          className="hidden md:flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative">
            <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-[#2E7D32]">
              <img
                src="https://images.unsplash.com/photo-1781773338901-72fec08dbdb4?w=600&h=600&fit=crop&auto=format"
                alt="Pure organic honey, almonds, and natural products"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-xl px-5 py-3"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#D4A017]/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#D4A017] fill-[#D4A017]" />
                </div>
                <div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>Trusted by</div>
                  <div className="text-sm font-bold text-[#222]" style={{ fontFamily: "Poppins, sans-serif" }}>5,000+ Families</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-6 bg-[#D4A017] rounded-2xl shadow-xl px-5 py-3 text-white"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-xs font-medium" style={{ fontFamily: "Inter, sans-serif" }}>100% Pure</div>
              <div className="text-sm font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>No Chemicals</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "Inter, sans-serif" }}>Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-[#2E7D32]/10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative overflow-hidden h-52 bg-[#f0f7f0]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-4 left-4 bg-[#2E7D32] text-white text-xs font-semibold px-3 py-1 rounded-full" style={{ fontFamily: "Poppins, sans-serif" }}>
          {product.badge}
        </span>
        <span className="absolute top-4 right-4 bg-white/90 text-[#222] text-xs font-medium px-3 py-1 rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
          {product.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-[#1B5E20] text-xl mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#D4A017] font-bold text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
            {product.price}
          </span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />
            ))}
          </div>
        </div>
        <a
          href={whatsappLink(`Assalam o Alaikum! I'd like to order: ${product.name} (${product.price})`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#2E7D32] text-white font-semibold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#1B5E20] transition-colors text-sm"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Order on WhatsApp
        </a>
      </div>
    </motion.div>
  );
}

// ─── Products Section ─────────────────────────────────────────────────────────

function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  return (
    <section id="products" className="py-24 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#D4A017] text-sm font-semibold tracking-widest uppercase block mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Nature's Finest Selection
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
            Every product is sourced directly from certified organic farms and artisan producers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

function WhySection() {
  const features = [
    { icon: Leaf, title: "100% Organic", desc: "Every product carries full organic certification. No synthetic pesticides, ever.", color: "#2E7D32" },
    { icon: ShieldCheck, title: "No Chemicals", desc: "We rigorously test all products to ensure they're free from harmful additives.", color: "#1B5E20" },
    { icon: Droplets, title: "Farm Fresh", desc: "Sourced directly from farms and delivered to your door with zero middlemen.", color: "#D4A017" },
    { icon: Star, title: "Premium Quality", desc: "Handpicked, quality-graded, and packaged to preserve freshness and potency.", color: "#F4A261" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#D4A017] text-sm font-semibold tracking-widest uppercase block mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Why A Shahid
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20]" style={{ fontFamily: "Poppins, sans-serif" }}>
            Our Promise to You
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="text-center p-8 rounded-3xl bg-[#FFF8E7] border border-[#2E7D32]/10 hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform"
                style={{ background: `${f.color}20` }}
              >
                <f.icon className="w-7 h-7" style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-[#1B5E20] text-xl mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-[#2E7D32]">
            <img
              src="https://images.unsplash.com/photo-1779526919864-4e306ed2f5b4?w=800&h=600&fit=crop&auto=format"
              alt="Lush organic farm where Al Shahid products are sourced"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Accent block */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#D4A017] rounded-3xl -z-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#2E7D32]/20 rounded-3xl -z-10" />

          {/* Stat card */}
          <motion.div
            className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl px-6 py-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-3xl font-bold text-[#2E7D32]" style={{ fontFamily: "Poppins, sans-serif" }}>8+</div>
            <div className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>Years of Trust</div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[#D4A017] text-sm font-semibold tracking-widest uppercase block mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-6 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
            From Passionate Roots to Your Table
          </h2>
          <p className="text-gray-600 mb-5 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Al Shahid Organics was founded with a singular mission: to give Pakistani families access to truly pure, chemical-free organic products that our grandparents grew up with.
          </p>
          <p className="text-gray-600 mb-5 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            We work directly with verified organic farmers across Pakistan, cutting out middlemen and ensuring you receive products at their absolute freshest — from Sidr honey harvested in mountain valleys to ghee churned using the ancient bilona method.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Every batch is lab-tested for purity. We believe in full transparency because you deserve to know exactly what you're feeding your family.
          </p>

          <div className="flex gap-8">
            {[["5,000+", "Happy Families"], ["100%", "Organic Certified"], ["Zero", "Chemicals Used"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-bold text-[#2E7D32]" style={{ fontFamily: "Poppins, sans-serif" }}>{num}</div>
                <div className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#1B5E20] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#D4A017] text-sm font-semibold tracking-widest uppercase block mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
            Words From Our Customers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 cursor-pointer transition-all duration-300 ${
                active === i ? "bg-white/20 scale-105 shadow-2xl" : "hover:bg-white/15"
              }`}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#D4A017] fill-[#D4A017]" />
                ))}
              </div>
              <p className="text-white/90 text-sm leading-relaxed mb-5 italic" style={{ fontFamily: "Inter, sans-serif" }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4A017] flex items-center justify-center text-[#222] font-bold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>{t.name}</div>
                  <div className="text-white/60 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{t.city}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#D4A017] text-sm font-semibold tracking-widest uppercase block mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B5E20]" style={{ fontFamily: "Poppins, sans-serif" }}>
            We'd Love to Hear From You
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              // { icon: MapPin, label: "Address", value: "Street 14, Organic Market, Lahore, Pakistan" },
              { icon: Phone, label: "Phone", value: "+92 321 6643901" },
              // { icon: Mail, label: "Email", value: "[EMAIL_ADDRESS]" },
              // { icon: Clock, label: "Business Hours", value: "Mon–Sat: 9AM – 8PM\nSunday: 11AM – 5PM" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#2E7D32]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#2E7D32]" />
                </div>
                <div>
                  <div className="font-semibold text-[#1B5E20] mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>{item.label}</div>
                  <div className="text-gray-500 text-sm whitespace-pre-line" style={{ fontFamily: "Inter, sans-serif" }}>{item.value}</div>
                </div>
              </div>
            ))}

            <a
              href={whatsappLink("Assalam o Alaikum! I have a query about Al Shahid Organics.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#1da851] transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with Us Now
            </a>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-lg h-80 md:h-auto bg-[#e8f5e9] relative"
          >
            <img
              src="https://images.unsplash.com/photo-1714024970949-7399a6950d7e?w=800&h=600&fit=crop&auto=format"
              alt="Organic farm location"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1B5E20]/40 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 text-center shadow-xl">
                <MapPin className="w-8 h-8 text-[#2E7D32] mx-auto mb-2" />
                <div className="font-bold text-[#1B5E20]" style={{ fontFamily: "Poppins, sans-serif" }}>Find Us in Lahore</div>
                <div className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>Online  at +92 321 6643901</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <footer className="bg-[#1B5E20] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#D4A017] rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>Al Shahid Organics</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              Bringing nature's finest organic products directly to your door. Pure, chemical-free, and trusted by thousands of Pakistani families.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#D4A017]" style={{ fontFamily: "Poppins, sans-serif" }}>Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Products", "About", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#D4A017]" style={{ fontFamily: "Poppins, sans-serif" }}>Contact</h4>
            <ul className="space-y-2 text-white/60 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              <li>+92 321 6643901</li>
              {/* <li>contact@alshahidorganics.pk</li> */}
              <li>Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2026 Al Shahid Organics. All rights reserved.
          </p>
          <button
            onClick={onAdminClick}
            className="text-white/20 hover:text-white/40 text-xs transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─── Admin Login ──────────────────────────────────────────────────────────────

function AdminLogin({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    if (email === "shahid@admin.com" && password === "admin123") {
      onLogin();
    } else {
      setError("Invalid credentials. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1782087972248-82af30050866?w=1600&h=900&fit=crop&auto=format)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 text-white/70 hover:text-white flex items-center gap-2 text-sm transition-colors z-10"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <X className="w-4 h-4" /> Back to Site
      </button>

      {/* Login Card */}
      <motion.div
        className={`relative z-10 w-full max-w-md mx-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl ${shake ? "animate-bounce" : ""}`}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ animation: shake ? "shake 0.4s ease-in-out" : undefined }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#D4A017] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>Admin Portal</h1>
          <p className="text-white/60 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Al Shahid Organics</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@admin.com"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
              required
            />
          </div>
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/30 focus:outline-none focus:border-[#D4A017] transition-colors text-sm"
                style={{ fontFamily: "Inter, sans-serif" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRemember(!remember)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${remember ? "bg-[#D4A017] border-[#D4A017]" : "border-white/30"}`}
            >
              {remember && <Check className="w-3 h-3 text-white" />}
            </button>
            <span className="text-white/60 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>Remember me</span>
          </div>

          {error && (
            <motion.div
              className="flex items-center gap-2 bg-red-500/20 border border-red-400/40 rounded-xl px-4 py-3 text-red-200 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4A017] text-[#222] font-bold py-3.5 rounded-xl hover:bg-[#c4911a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#222]/30 border-t-[#222] rounded-full animate-spin" />
            ) : "Sign In"}
          </button>
        </form>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)}
        }
      `}</style>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

interface AdminProductForm {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  badge: string;
}

const EMPTY_FORM: AdminProductForm = { name: "", description: "", price: "", category: "Honey", image: "", badge: "Organic" };

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [view, setView] = useState<AdminView>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const [form, setForm] = useState<AdminProductForm>(EMPTY_FORM);
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const dragRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = { ...form, id: Date.now() };
    await fetch('/api/products', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct) 
    });
    setProducts((p) => [newProduct, ...p]);
    setForm(EMPTY_FORM);
    setView("products");
    showToast("Product added successfully!");
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...form, id: editId! };
    await fetch('/api/products', { 
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated) 
    });
    setProducts((p) => p.map((pr) => pr.id === editId ? updated : pr));
    setView("products");
    showToast("Product updated successfully!");
    setEditId(null);
  };

  const handleDelete = async () => {
    await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
    setProducts((p) => p.filter((pr) => pr.id !== deleteId));
    setDeleteId(null);
    showToast("Product deleted.", "error");
  };

  const startEdit = (product: Product) => {
    setForm({ name: product.name, description: product.description, price: product.price, category: product.category, image: product.image, badge: product.badge });
    setEditId(product.id);
    setView("edit-product");
  };

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const navItems = [
    { id: "dashboard" as AdminView, icon: LayoutDashboard, label: "Dashboard" },
    { id: "products" as AdminView, icon: Package, label: "Products" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-60" : "w-16"} bg-[#1B5E20] flex-shrink-0 flex flex-col transition-all duration-300 min-h-screen`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-[#D4A017] rounded-lg flex items-center justify-center flex-shrink-0">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && <span className="text-white font-bold text-sm truncate" style={{ fontFamily: "Poppins, sans-serif" }}>Al Shahid Admin</span>}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                view === item.id || (view === "add-product" && item.id === "products") || (view === "edit-product" && item.id === "products")
                  ? "bg-white/20 text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-800">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-gray-800 text-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
              {view === "dashboard" ? "Dashboard" : view === "products" ? "Products" : view === "add-product" ? "Add Product" : "Edit Product"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center text-white text-xs font-bold">S</div>
            <span className="text-sm text-gray-600 hidden sm:block">shahid@admin.com</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* ── Dashboard View ── */}
          {view === "dashboard" && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                  { label: "Total Products", value: products.length, icon: Package, color: "#2E7D32", bg: "#e8f5e9" },
                  { label: "Categories", value: new Set(products.map((p) => p.category)).size, icon: Leaf, color: "#D4A017", bg: "#fff8e7" },
                  { label: "Storage Used", value: "12.4 MB", icon: LayoutDashboard, color: "#F4A261", bg: "#fff3e0" },
                  { label: "Latest Upload", value: products[0]?.name.slice(0, 12) + "…" || "—", icon: Star, color: "#1B5E20", bg: "#e8f5e9" },
                ].map((card) => (
                  <motion.div
                    key={card.label}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-500 text-sm">{card.label}</span>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                        <card.icon className="w-4 h-4" style={{ color: card.color }} />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>{card.value}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent products */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-gray-800" style={{ fontFamily: "Poppins, sans-serif" }}>Recent Products</h2>
                  <button onClick={() => setView("products")} className="text-[#2E7D32] text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {products.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 text-sm truncate">{p.name}</div>
                        <div className="text-gray-400 text-xs">{p.category} · {p.price}</div>
                      </div>
                      <span className="text-xs bg-[#e8f5e9] text-[#2E7D32] px-2.5 py-1 rounded-full font-medium">{p.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Products View ── */}
          {view === "products" && (
            <div>
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2E7D32] bg-white"
                  />
                </div>
                <button
                  onClick={() => { setForm(EMPTY_FORM); setView("add-product"); }}
                  className="flex items-center gap-2 bg-[#2E7D32] text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-[#1B5E20] transition-colors text-sm"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                  <div className="w-16 h-16 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-[#2E7D32]" />
                  </div>
                  <h3 className="font-bold text-gray-700 text-lg mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>No products found</h3>
                  <p className="text-gray-400 text-sm mb-6">Start by adding your first product.</p>
                  <button
                    onClick={() => { setForm(EMPTY_FORM); setView("add-product"); }}
                    className="bg-[#2E7D32] text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-[#1B5E20] transition-colors text-sm"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Add First Product
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        {["Image", "Title", "Category", "Price", "Date Added", "Actions"].map((h) => (
                          <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filtered.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-5 py-4">
                            <div className="w-11 h-11 rounded-xl overflow-hidden bg-gray-100">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="px-5 py-4">
                            <div className="font-medium text-gray-800 text-sm">{p.name}</div>
                            <div className="text-gray-400 text-xs mt-0.5 max-w-xs truncate">{p.description}</div>
                          </td>
                          <td className="px-5 py-4">
                            <span className="text-xs bg-[#e8f5e9] text-[#2E7D32] px-2.5 py-1 rounded-full font-medium">{p.category}</span>
                          </td>
                          <td className="px-5 py-4 text-sm font-medium text-[#D4A017]">{p.price}</td>
                          <td className="px-5 py-4 text-xs text-gray-400">July 15, 2025</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => startEdit(p)}
                                className="p-2 rounded-lg hover:bg-[#e8f5e9] text-[#2E7D32] transition-colors"
                                aria-label="Edit"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteId(p.id)}
                                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                aria-label="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Add / Edit Product Form ── */}
          {(view === "add-product" || view === "edit-product") && (
            <div className="max-w-2xl">
              <form onSubmit={view === "add-product" ? handleAdd : handleEdit} className="space-y-5">
                {/* Image Upload */}
                <div
                  ref={dragRef}
                  className="bg-white rounded-2xl border-2 border-dashed border-[#2E7D32]/30 p-8 text-center hover:border-[#2E7D32] transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (!file) return;
                    setUploadingImg(true); setUploadErr("");
                    try {
                      const data = new FormData();
                      data.append('image', file);
                      const res = await fetch('/api/upload', { method: 'POST', body: data });
                      const json = await res.json();
                      if (json.url) { setForm((f) => ({ ...f, image: json.url })); }
                      else { setUploadErr('Upload failed – try pasting a URL below.'); }
                    } catch { setUploadErr('Upload failed – try pasting a URL below.'); }
                    setUploadingImg(false);
                  }}
                >
                  {uploadingImg ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-[#2E7D32]/20 border-t-[#2E7D32] rounded-full animate-spin" />
                      <p className="text-gray-500 text-sm">Uploading image…</p>
                    </div>
                  ) : form.image ? (
                    <div className="relative inline-block">
                      <img src={form.image} alt="Preview" className="w-40 h-40 object-cover rounded-xl mx-auto" />
                      <button
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, image: "" }))}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-[#2E7D32]/40 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm mb-1">Drag &amp; drop image here</p>
                      <p className="text-gray-400 text-xs mb-3">or</p>
                      <label className="cursor-pointer bg-[#2E7D32] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1B5E20] transition-colors inline-block">
                        Browse Files
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingImg(true); setUploadErr("");
                          try {
                            const data = new FormData();
                            data.append('image', file);
                            const res = await fetch('/api/upload', { method: 'POST', body: data });
                            const json = await res.json();
                            if (json.url) { setForm((f) => ({ ...f, image: json.url })); }
                            else { setUploadErr('Upload failed – try pasting a URL below.'); }
                          } catch { setUploadErr('Upload failed – try pasting a URL below.'); }
                          setUploadingImg(false);
                        }} />
                      </label>
                    </>
                  )}
                  {uploadErr && (
                    <p className="text-red-500 text-xs mt-3 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {uploadErr}
                    </p>
                  )}
                </div>

                {/* Image URL fallback */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Or paste Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={form.image.startsWith('/uploads') ? '' : form.image}
                    onChange={(e) => { setUploadErr(""); setForm((f) => ({ ...f, image: e.target.value })); }}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#2E7D32] bg-gray-50"
                  />
                </div>

                {/* Form Fields */}
                {[
                  { key: "name", label: "Product Title", placeholder: "e.g. Pure Sidr Honey", type: "text" },
                  { key: "price", label: "Price", placeholder: "e.g. PKR 2,800", type: "text" },
                  { key: "badge", label: "Badge", placeholder: "e.g. Organic, Best Seller", type: "text" },
                ].map((field) => (
                  <div key={field.key} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof AdminProductForm]}
                      onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                      required={field.key === "name"}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#2E7D32] bg-gray-50"
                    />
                  </div>
                ))}

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#2E7D32] bg-gray-50"
                  >
                    {["Honey", "Ghee", "Oils", "Dry Fruits", "Herbal", "Natural Foods"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the product..."
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#2E7D32] bg-gray-50 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#2E7D32] text-white font-semibold py-3 rounded-xl hover:bg-[#1B5E20] transition-colors"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {view === "add-product" ? "Save Product" : "Update Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setView("products"); setForm(EMPTY_FORM); }}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>Delete Product?</h3>
              <p className="text-gray-500 text-sm text-center mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                This action cannot be undone. The product will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white font-semibold py-3 rounded-xl hover:bg-red-600 transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 border border-gray-200 text-gray-600 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-xl text-sm font-medium ${
              toast.type === "success" ? "bg-[#2E7D32] text-white" : "bg-red-500 text-white"
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {toast.type === "success" ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ onAdminClick }: { onAdminClick: () => void }) {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar onAdminClick={onAdminClick} />
      <HeroSection />
      <ProductsSection />
      <WhySection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer onAdminClick={onAdminClick} />
      <FloatingWhatsApp />
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [authed, setAuthed] = useState(false);

  const goAdmin = () => setPage("admin-login");
  const handleLogin = () => { setAuthed(true); setPage("admin-dashboard"); };
  const handleLogout = () => { setAuthed(false); setPage("home"); };

  return (
    <AnimatePresence mode="wait">
      {page === "home" && (
        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <HomePage onAdminClick={goAdmin} />
        </motion.div>
      )}
      {page === "admin-login" && (
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <AdminLogin onLogin={handleLogin} onBack={() => setPage("home")} />
        </motion.div>
      )}
      {page === "admin-dashboard" && authed && (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <AdminDashboard onLogout={handleLogout} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
