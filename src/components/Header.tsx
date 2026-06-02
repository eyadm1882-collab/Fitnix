"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "اكتشف", href: "/discover" },
  { label: "المدرب الذكي", href: "/ai" },
  { label: "لوحة التحكم", href: "/dashboard" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-sm"
              : "bg-transparent"
          }`}
          style={{ maxWidth: "1440px" }}
        >
          {/* Left */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white/80 hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Desktop Nav - Left side */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  scrolled
                    ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Center Logo */}
          <Link href="/" className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${
            scrolled ? "opacity-100" : "opacity-90"
          }`}>
            <div className="flex items-center gap-2">
              <Image
                src="/header.tsx/middle.png"
                alt="Fitnix"
                width={36}
                height={36}
                className="h-9 w-9"
                priority
              />
              <span className={`text-lg font-black transition-colors ${
                scrolled ? "text-fitnix" : "text-white"
              }`}>
                Fitnix
              </span>
            </div>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-2">
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {navItems.slice(2).map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    scrolled
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
            <Link
              href="/auth/login"
              className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                scrolled
                  ? "bg-fitnix text-white hover:bg-fitnix-dark shadow-sm"
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-16 right-0 left-0 bg-white shadow-lg border-b border-gray-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    <span className="block px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 hover:text-fitnix transition-all">
                      {item.label}
                    </span>
                  </Link>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-100">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center rounded-xl bg-fitnix px-4 py-3 text-sm font-bold text-white"
                  >
                    تسجيل الدخول
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
