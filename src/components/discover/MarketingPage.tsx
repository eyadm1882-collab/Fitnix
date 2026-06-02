"use client";

import { motion } from "framer-motion";
import {
  Sparkles, Dumbbell, UtensilsCrossed, Camera, Brain, Target,
  BarChart3, CheckCircle2, Star, ArrowLeft, Zap, Shield, Trophy
} from "lucide-react";
import { useState } from "react";
import ComingSoonModal from "@/components/ComingSoonModal";
import WhyFitnixDifferent from "./WhyFitnixDifferent";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.08 },
};

export default function MarketingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pb-28">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black px-4 py-28 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-72 w-72 rounded-full bg-fitnix/5 blur-[120px]"
              style={{ left: `${10 + i * 30}%`, top: `${20 + i * 20}%` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/10 px-4 py-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4 text-fitnix" />
            <span className="text-sm font-medium text-fitnix-light">ثورة الذكاء الاصطناعي في اللياقة</span>
          </motion.div>

          <motion.h2
            className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            {...fadeUp}
          >
            أول منصة عربية للذكاء الاصطناعي
            <br />
            <span className="gradient-text">في اللياقة البدنية والتغذية</span>
          </motion.h2>

          <motion.p
            className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-white/60 sm:text-xl"
            {...fadeUp}
          >
            Fitnix هو أول منصة عربية متكاملة تستخدم الذكاء الاصطناعي لتحويل طريقة تدريبك وتغذيتك.
            خطط تمارين ذكية، تحليل تغذية بالكاميرا، ومدرب شخصي يعمل بالـ AI
          </motion.p>

          <motion.div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center" {...fadeUp}>
            <Link href="/auth/signup" className="btn-primary btn-lg">
              ابدأ مجاناً
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <button onClick={() => setModalOpen(true)} className="btn-secondary btn-lg !border-white/20 !text-white hover:!bg-white/5">
              تعرف أكثر
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
            {[
              { icon: Bot, title: "مدرب AI شخصي", desc: "مدرب ذكي يجيب عن أسئلتك ويساعدك في كل خطوة", color: "from-fitnix to-fitnix-dark" },
              { icon: Brain, title: "تحليل ذكي", desc: "يحلل جسمك وطعامك ويقترح أفضل الخطط", color: "from-purple-500 to-pink-500" },
              { icon: Dumbbell, title: "تمارين مخصصة", desc: "خطط تمارين حسب هدفك ومستواك", color: "from-blue-500 to-cyan-500" },
              { icon: UtensilsCrossed, title: "تغذية ذكية", desc: "خطط وجبات متكاملة حسب احتياجاتك", color: "from-amber-500 to-orange-500" },
              { icon: Camera, title: "ماسح طعام", desc: "صور طعامك واحسب سعراته", color: "from-orange-500 to-red-500" },
              { icon: Target, title: "تتبع التقدم", desc: "تابع تطورك وحقق أهدافك", color: "from-rose-500 to-red-500" },
            ].map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md`}>
                  <f.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Fitnix Different */}
      <WhyFitnixDifferent />

      {/* Stats */}
      <section className="bg-gradient-to-r from-fitnix to-fitnix-dark py-10">
        <div className="container-premium">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { number: "50K+", label: "مستخدم" },
              { number: "1000+", label: "تمرين" },
              { number: "AI", label: "تقنية" },
            ].map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="text-3xl font-black text-white sm:text-4xl">{s.number}</div>
                <div className="mt-1.5 text-xs text-white/70 sm:text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-premium">
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 sm:p-14 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full border border-white/5" />
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-white/5" />
            </div>
            <div className="relative mx-auto max-w-xl">
              <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
                جهز جسمك لـ <span className="gradient-text">الصيف</span>
              </h2>
              <p className="mb-8 text-white/60">ابدأ رحلتك اليوم مع Fitnix — مدربك الشخصي بالذكاء الاصطناعي</p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/auth/signup" className="btn-primary btn-lg">
                  ابدأ مجاناً
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/dashboard" className="btn-secondary btn-lg !border-white/20 !text-white hover:!bg-white/5">
                  لوحة التحكم
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <ComingSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function Bot({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}
