"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ComingSoonModal from "./ComingSoonModal";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <section className="relative min-h-svh w-full overflow-hidden bg-black md:min-h-screen">
        {/* Background Image - responsive sources */}
        <div className="absolute inset-0">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="/Hero.tsx/73e790dc-e19e-48a1-8d1e-67e7e6d1cbaa.jpg"
            />
            <source
              media="(min-width: 640px)"
              srcSet="/Hero.tsx/255738c6-e0c9-4542-b55b-1fe12b86e2aa.jpg"
            />
            <img
              src="/Hero.tsx/73e790dc-e19e-48a1-8d1e-67e7e6d1cbaa.jpg"
              alt="Fitnix Hero"
              className="h-full w-full object-cover"
            />
          </picture>
          {/* Desktop: right-side gradient overlay for RTL */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/30 to-black/60 max-md:hidden" />
          {/* Mobile: bottom blur gradient only */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black via-black/70 to-transparent md:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 md:hidden" />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-48 w-48 rounded-full bg-fitnix/5 blur-3xl sm:h-64 sm:w-64"
              style={{
                left: `${10 + i * 25}%`,
                top: `${15 + i * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content - desktop: right-aligned, mobile: bottom stacked */}
        <div className="relative z-10 flex min-h-svh flex-col items-center justify-end px-4 pb-16 pt-28 text-center md:min-h-screen md:items-end md:justify-center md:pb-0 md:pe-16 md:ps-8 md:text-right lg:pe-24 xl:pe-32">
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/10 px-4 py-1.5 backdrop-blur-sm md:px-5 md:py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="h-2 w-2 rounded-full bg-fitnix animate-pulse" />
              <span className="text-xs font-medium text-fitnix-light sm:text-sm">
                أول منصة عربية للذكاء الاصطناعي في اللياقة
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="mb-4 text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            >
              سجل في تطبيق{" "}
              <span className="bg-gradient-to-r from-fitnix to-fitnix-light bg-clip-text text-transparent">
                FITNIX
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mb-8 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              ثورة الذكاء الاصطناعي في عالم اللياقة البدنية
              <br />
              خطط تمارين وتغذية مخصصة بتقنية AI
            </motion.p>

            {/* Buttons - right aligned on desktop */}
            <motion.div
              className="flex flex-col items-stretch gap-3 sm:flex-row md:items-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button
                onClick={() => router.push("/discover")}
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-fitnix/25 transition-all hover:shadow-2xl hover:shadow-fitnix/40 sm:px-10 sm:text-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">اكتشف FITNIX</span>
                <ArrowLeft className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-x-1 sm:h-5 sm:w-5" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-fitnix-dark to-fitnix"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>

              <motion.button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-white/20 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5 sm:px-10 sm:text-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                انشاء حساب جديد
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-6 md:justify-start md:gap-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {[
                { number: "AI", label: "مدرب ذكي" },
                { number: "1000+", label: "تمرين" },
                { number: "50K+", label: "مستخدم" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center md:text-right"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div className="text-xl font-black text-white sm:text-2xl">
                    {stat.number}
                  </div>
                  <div className="mt-0.5 text-xs text-white/50 sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ComingSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
