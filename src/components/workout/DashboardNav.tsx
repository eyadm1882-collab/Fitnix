"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dumbbell, Bot, LogOut, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardNav() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fitnix_user_name");
    localStorage.removeItem("fitnix_workout_data");
    router.push("/discover");
  };

  return (
    <motion.nav
      className={`fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-sm backdrop-blur-xl" : "bg-white"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/header.tsx/middle.png"
            alt="Fitnix"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <span className="text-lg font-black text-fitnix">Fitnix</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/ai"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-fitnix/5 hover:text-fitnix"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">المساعد الذكي</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">تسجيل خروج</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
