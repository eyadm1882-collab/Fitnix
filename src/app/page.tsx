"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, Bot, UtensilsCrossed, Camera, Scan, Dumbbell,
  Brain, Target, BarChart3, ArrowLeft, ArrowUpRight,
  Zap, Shield, Trophy, Star, ChevronLeft
} from "lucide-react";

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

const features = [
  { icon: Bot, label: "المدرب الذكي", desc: "اسأل AI عن أي تمرين أو تغذية", href: "/ai", color: "from-fitnix to-fitnix-dark" },
  { icon: UtensilsCrossed, label: "خطة التغذية", desc: "وجبات مخصصة حسب هدفك", href: "/meal-plan", color: "from-amber-500 to-orange-500" },
  { icon: Camera, label: "ماسح الطعام", desc: "صور طعامك + تحليل بالسعرات", href: "/food-scanner", color: "from-orange-500 to-red-500" },
  { icon: Scan, label: "تحليل الجسم", desc: "صور + AI لتقييم جسمك", href: "/body-analysis", color: "from-purple-500 to-pink-500" },
  { icon: Dumbbell, label: "مكتبة التمارين", desc: "أكثر من 1000 تمرين", href: "/discover", color: "from-blue-500 to-cyan-500" },
  { icon: BarChart3, label: "لوحة التحكم", desc: "مركز القيادة الخاص بك", href: "/dashboard", color: "from-rose-500 to-red-500" },
];

const steps = [
  { num: "01", title: "أنشئ حسابك", desc: "سجل ببياناتك وحدد أهدافك الرياضية", icon: Target },
  { num: "02", title: "دع AI يحللك", desc: "احصل على خطة تمارين وتغذية مخصصة", icon: Brain },
  { num: "03", title: "تابع تقدمك", desc: "حلل جسمك، امسح طعامك، واسأل مدربك AI", icon: BarChart3 },
];

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      {/* ===== Features Grid ===== */}
      <section className="section-spacing">
        <div className="container-premium">
          <motion.div className="mx-auto mb-14 max-w-2xl text-center" {...fadeUp}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/5 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-fitnix" />
              <span className="text-xs font-bold text-fitnix">جميع الأدوات في مكان واحد</span>
            </span>
            <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
              منصة <span className="text-fitnix">متكاملة</span> للياقة والتغذية
            </h2>
            <p className="mt-3 text-gray-500">
              كل ما تحتاجه في رحلتك الرياضية — من التمارين إلى التغذية والتحليل بالذكاء الاصطناعي
            </p>
          </motion.div>

          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" variants={stagger}>
            {features.map((f) => (
              <motion.div key={f.label} variants={fadeUp}>
                <Link href={f.href}>
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:shadow-lg"
                    whileHover={{ y: -4 }}
                  >
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.color} shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md`}>
                      <f.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">{f.label}</h3>
                    <p className="text-sm text-gray-500">{f.desc}</p>
                    <ArrowUpRight className="absolute left-4 bottom-4 h-4 w-4 text-gray-200 transition-all group-hover:text-fitnix group-hover:-translate-y-0.5 group-hover:-translate-x-0.5" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="section-spacing bg-white">
        <div className="container-premium">
          <motion.div className="mx-auto mb-14 max-w-2xl text-center" {...fadeUp}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/5 px-4 py-1.5">
              <Star className="h-3.5 w-3.5 text-fitnix" />
              <span className="text-xs font-bold text-fitnix">ثلاث خطوات فقط</span>
            </span>
            <h2 className="mt-4 text-3xl font-black text-gray-900 sm:text-4xl">
              ابدأ في <span className="text-fitnix">٣</span> خطوات
            </h2>
            <p className="mt-3 text-gray-500">رحلتك مع Fitnix تبدأ من هنا — بسيطة وسريعة</p>
          </motion.div>

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute right-1/2 top-0 bottom-0 w-px translate-x-1/2 bg-gradient-to-b from-fitnix/30 via-fitnix/10 to-transparent hidden md:block" />
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5 shadow-sm">
                    <span className="text-2xl font-black text-fitnix">{s.num}</span>
                  </div>
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/5">
                    <s.icon className="h-5 w-5 text-fitnix" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
      <section className="bg-gradient-to-r from-fitnix to-fitnix-dark py-10">
        <div className="container-premium">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { number: "50K+", label: "مستخدم نشط" },
              { number: "1000+", label: "تمرين احترافي" },
              { number: "AI", label: "ذكاء اصطناعي" },
            ].map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-black text-white sm:text-4xl">{s.number}</div>
                <div className="mt-1.5 text-xs text-white/70 sm:text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="section-spacing">
        <div className="container-premium">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 sm:p-14 lg:p-20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full border border-white/5" />
              <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-white/5" />
            </div>
            <div className="relative mx-auto max-w-2xl text-center">
              <motion.h2
                className="mb-4 text-3xl font-black text-white sm:text-4xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                جهز جسمك لـ{" "}
                <span className="bg-gradient-to-r from-fitnix to-fitnix-light bg-clip-text text-transparent">الصيف</span>
              </motion.h2>
              <motion.p
                className="mb-8 text-white/60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                ابدأ رحلتك اليوم مع Fitnix — مدربك الشخصي بالذكاء الاصطناعي
              </motion.p>
              <motion.div
                className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fitnix to-fitnix-dark px-8 py-4 text-base font-bold text-white shadow-lg shadow-fitnix/25 transition-all hover:shadow-xl hover:shadow-fitnix/35"
                >
                  ابدأ مجاناً
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  href="/discover"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white/40"
                >
                  اكتشف المنصة
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
