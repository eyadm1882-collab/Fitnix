"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import ComingSoonModal from "./ComingSoonModal";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <section className="relative min-h-svh w-full overflow-hidden bg-black md:min-h-screen">
        <div className="absolute inset-0">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/Hero.tsx/73e790dc-e19e-48a1-8d1e-67e7e6d1cbaa.jpg" />
            <source media="(min-width: 640px)" srcSet="/Hero.tsx/255738c6-e0c9-4542-b55b-1fe12b86e2aa.jpg" />
            <img src="/Hero.tsx/73e790dc-e19e-48a1-8d1e-67e7e6d1cbaa.jpg" alt="" className="h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-black/70 max-md:hidden" />
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black via-black/70 to-transparent md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>

        {/* Ambient glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-fitnix/5 blur-3xl"
              style={{
                width: `${300 + i * 100}px`,
                height: `${300 + i * 100}px`,
                left: `${5 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{ y: [0, -30, 0], scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pb-16 pt-24 text-center md:items-end md:justify-center md:pe-16 md:ps-8 md:text-right lg:pe-28 xl:pe-36">
          <div className="max-w-2xl">
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/10 px-4 py-1.5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-fitnix animate-pulse" />
              <span className="text-xs font-medium text-fitnix-light sm:text-sm">
                أول منصة عربية للذكاء الاصطناعي في اللياقة
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              سجل في تطبيق{" "}
              <span className="bg-gradient-to-r from-fitnix to-fitnix-light bg-clip-text text-transparent">
                FITNIX
              </span>
            </motion.h1>

            <motion.p
              className="mb-10 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              ثورة الذكاء الاصطناعي في عالم اللياقة البدنية
              <br />
              خطط تمارين وتغذية مخصصة بتقنية AI
            </motion.p>

            <motion.div
              className="flex flex-col items-stretch gap-4 sm:flex-row md:items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <motion.button
                onClick={() => router.push("/discover")}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-fitnix to-fitnix-dark px-8 py-4 text-base font-bold text-white shadow-lg shadow-fitnix/25 transition-all hover:shadow-xl hover:shadow-fitnix/35 sm:px-10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">اكتشف FITNIX</span>
                <ArrowLeft className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-fitnix-dark to-fitnix"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </motion.button>

              <motion.button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                إنشاء حساب جديد
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-14 flex flex-wrap items-center justify-center gap-10 md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {[
                { number: "AI", label: "مدرب ذكي" },
                { number: "1000+", label: "تمرين احترافي" },
                { number: "50K+", label: "مستخدم" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center md:text-right"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                >
                  <div className="text-2xl font-black text-white sm:text-3xl tracking-tight">{stat.number}</div>
                  <div className="mt-1 text-xs text-white/50 sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/30"
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </section>

      <ComingSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
