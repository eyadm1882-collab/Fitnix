"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Dumbbell,
  UtensilsCrossed,
  Camera,
  Brain,
  Target,
  BarChart3,
  Users,
  CheckCircle2,
  Star,
  ArrowLeft,
  Zap,
  Shield,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import ComingSoonModal from "@/components/ComingSoonModal";
import WhyFitnixDifferent from "./WhyFitnixDifferent";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

export default function MarketingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="pb-24">
      {/* Hero Marketing */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black px-4 py-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-96 w-96 rounded-full bg-fitnix/10 blur-[120px]"
              style={{ left: `${10 + i * 30}%`, top: `${20 + i * 20}%` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/10 px-4 py-2"
            initial={{ opacity: 0, y: 20 }}
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
            <span className="bg-gradient-to-r from-fitnix to-fitnix-light bg-clip-text text-transparent">
              في اللياقة البدنية والتغذية
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-white/60 sm:text-xl"
            {...fadeUp}
          >
            Fitnix هو أول منصة عربية متكاملة تستخدم الذكاء الاصطناعي لتحويل طريقة تدريبك وتغذيتك.
            خطط تمارين ذكية، تحليل تغذية بالكاميرا، ومدرب شخصي يعمل بالـ AI
          </motion.p>
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="relative -mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Brain,
                title: "خطط تمارين بالذكاء الاصطناعي",
                desc: "يصنع AI خطط تمارين مخصصة حسب هدفك ومستواك",
              },
              {
                icon: Users,
                title: "مراجعة مدربين محترفين",
                desc: "جميع الخطط تراجع من نخبة المدربين المعتمدين",
              },
              {
                icon: Target,
                title: "خطط تغذية مخصصة",
                desc: "نظام غذائي متكامل يناسب هدفك وجسمك",
              },
              {
                icon: Camera,
                title: "مسح الطعام بالذكاء الاصطناعي",
                desc: "صور وجبتك واحسب سعراتها الحرارية تلقائياً",
              },
              {
                icon: BarChart3,
                title: "تحليل الجسم والأهداف",
                desc: "AI يحلل جسمك ويحدد أهدافك بدقة",
              },
              {
                icon: Dumbbell,
                title: "فيديوهات تمارين تفاعلية",
                desc: "شاهد التمارين بالفيديو مع تعليمات دقيقة",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group cursor-pointer rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-xl hover:shadow-fitnix/5"
                variants={fadeUp}
                whileHover={{ y: -5 }}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5 transition-all group-hover:from-fitnix/20 group-hover:to-fitnix/10">
                  <feature.icon className="h-7 w-7 text-fitnix" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="leading-relaxed text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div className="mb-16 text-center" {...fadeUp}>
            <span className="mb-4 inline-block rounded-full bg-fitnix/10 px-4 py-2 text-sm font-medium text-fitnix">
              كيف يعمل
            </span>
            <h2 className="text-4xl font-black text-gray-900 sm:text-5xl">
              ثلاث خطوات لتحقيق هدفك
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute right-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-fitnix/30 via-fitnix/10 to-transparent max-md:hidden" />

            <div className="space-y-12 md:space-y-24">
              {[
                {
                  step: "01",
                  title: "حدد هدفك",
                  desc: "أدخل معلوماتك وأهدافك الرياضية. AI يحلل بياناتك ويبني ملفك التدريبي",
                  icon: Target,
                },
                {
                  step: "02",
                  title: "احصل على خطتك",
                  desc: "AI يولد خطة تمارين وتغذية مخصصة. مدربينا يراجعونها ويضمنون جودتها",
                  icon: Sparkles,
                },
                {
                  step: "03",
                  title: "تدرب وتطور",
                  desc: "طبق الخطة، تابع تقدمك، وكل أسبوع تتكيف الخطط مع نتائجك",
                  icon: Trophy,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  className={`flex flex-col items-center gap-6 md:flex-row ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.2 }}
                >
                  <div className="flex-1 text-center md:text-right">
                    <span className="mb-2 inline-block text-sm font-bold text-fitnix">
                      الخطوة {item.step}
                    </span>
                    <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="max-w-md text-lg leading-relaxed text-gray-500">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-fitnix to-fitnix-dark shadow-lg shadow-fitnix/20 md:h-24 md:w-24">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Meal Scanner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <motion.div
            className="absolute -left-20 top-1/2 h-80 w-80 rounded-full bg-fitnix/10 blur-[150px]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <motion.div className="flex-1" {...fadeUp}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/10 px-4 py-2 text-sm text-fitnix-light">
                <Camera className="h-4 w-4" />
                مسح الطعام بالذكاء الاصطناعي
              </span>
              <h2 className="mb-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                صور طعامك
                <br />
                <span className="text-fitnix">احسب سعراتك</span>
              </h2>
              <p className="mb-8 max-w-md text-lg leading-relaxed text-white/60">
                استخدم كاميرا جوالك لتصوير أي وجبة، و AI يحلل مكوناتها ويحسب السعرات الحرارية
                والمغذيات بدقة مذهلة
              </p>
              <ul className="space-y-4">
                {[
                  "تحليل فوري للطعام بالكاميرا",
                  "حساب دقيق للسعرات والمغذيات",
                  "مكتبة ضخمة من الأطباق العربية والعالمية",
                  "توصيات ذكية لوجبات بديلة",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-fitnix" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative mx-auto aspect-[9/19] max-w-[280px]">
                <div className="absolute inset-0 rounded-[3rem] border-4 border-gray-700 bg-gray-800 shadow-2xl">
                  <div className="mt-8 flex justify-center">
                    <div className="h-2 w-20 rounded-full bg-gray-600" />
                  </div>

                  <div className="mx-4 mt-8 overflow-hidden rounded-2xl">
                    <div className="aspect-[4/3] bg-gradient-to-br from-fitnix/30 to-fitnix/10 p-4">
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <Camera className="mb-3 h-10 w-10 text-fitnix" />
                        <span className="text-sm font-medium text-white">صوّر وجبتك</span>
                      </div>
                    </div>
                  </div>

                  <div className="mx-4 mt-4 space-y-2">
                    <div className="h-3 w-3/4 rounded-full bg-white/10" />
                    <div className="h-3 w-1/2 rounded-full bg-white/10" />
                    <div className="mt-3 flex gap-2">
                      <div className="h-10 flex-1 rounded-xl bg-fitnix/20" />
                      <div className="h-10 flex-1 rounded-xl bg-fitnix/15" />
                      <div className="h-10 flex-1 rounded-xl bg-fitnix/10" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Workout Generator */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-12 lg:flex-row-reverse">
            <motion.div className="flex-1" {...fadeUp}>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-fitnix/10 px-4 py-2 text-sm font-medium text-fitnix">
                <Zap className="h-4 w-4" />
                مولد التمارين الذكي
              </span>
              <h2 className="mb-6 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
                تمرين مصمم خصيصاً
                <br />
                <span className="text-fitnix">لجسمك وهدفك</span>
              </h2>
              <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-500">
                AI يصمم لك خطة تمارين دقيقة بناءً على نوع جسمك، هدفك، مستوى لياقتك،
                والمعدات المتوفرة عندك
              </p>
              <ul className="space-y-4">
                {[
                  "تمارين مخصصة لهدفك (تضخيم، تنشيف، تقوية)",
                  "فيديوهات تعليمية لكل تمرين",
                  "تعديل تلقائي حسب تقدمك",
                  "جدول مرن يناسب وقتك",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-fitnix" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl">
                <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-5 py-3">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                  <span className="mr-3 text-sm text-gray-400">Fitnix AI - خطة التمرين</span>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">تمارين اليوم - الأحد</h4>
                    <span className="rounded-full bg-fitnix/10 px-3 py-1 text-xs font-medium text-fitnix">
                      AI Generated
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "بنش بريس", sets: "4 × 10", icon: Dumbbell },
                      { name: "دمبل صدر علوي", sets: "3 × 12", icon: Dumbbell },
                      { name: "هامر مستوي", sets: "4 × 10", icon: Dumbbell },
                      { name: "تجميع دمبل", sets: "3 × 15", icon: Dumbbell },
                    ].map((ex) => (
                      <div
                        key={ex.name}
                        className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 transition-colors hover:bg-fitnix/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/10">
                            <ex.icon className="h-5 w-5 text-fitnix" />
                          </div>
                          <span className="font-medium text-gray-900">{ex.name}</span>
                        </div>
                        <span className="text-sm font-bold text-fitnix">{ex.sets}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trainer Review System */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-64 w-64 rounded-full bg-fitnix/5 blur-[100px]"
              style={{ left: `${i * 60}%`, top: `${i * 40}%` }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: i }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div {...fadeUp}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/10 px-4 py-2 text-sm text-fitnix-light">
              <Shield className="h-4 w-4" />
              جودة مضمونة
            </span>
            <h2 className="mb-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              AI يصمم - مدربين يراجعون
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white/60">
              كل خطة تمارين وتغذية يصنعها الذكاء الاصطناعي تراجع من قبل نخبة المدربين
              المعتمدين لدينا لضمان أعلى جودة وأمان
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Brain, title: "AI يولد الخطة", desc: "ذكاء اصطناعي متطور يصمم خطة مخصصة" },
              { icon: Users, title: "مدرب يراجع", desc: "مدرب معتمد يراجع ويعدل الخطة" },
              { icon: CheckCircle2, title: "أنت تتدرب", desc: "خطة مضمونة الجودة 100%" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.15 }}
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-fitnix/10">
                  <item.icon className="h-8 w-8 text-fitnix" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Style Section */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div {...fadeUp}>
            <span className="mb-4 inline-block rounded-full bg-fitnix/10 px-4 py-2 text-sm font-medium text-fitnix">
              النتائج تتكلم
            </span>
            <h2 className="mb-6 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
              آلاف المستخدمين حققوا أهدافهم
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-500">
              انضم إلى مجتمع Fitnix وابدأ رحلة تحويل جسمك بالذكاء الاصطناعي
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "أحمد", goal: "تضخيم عضلي", result: "+12 كجم كتلة عضلية", period: "6 أشهر" },
              { name: "سارة", goal: "تنشيف", result: "-15 كجم دهون", period: "4 أشهر" },
              { name: "خالد", goal: "لياقة عامة", result: "تحسن 80%", period: "3 أشهر" },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              >
                <div className="relative h-48 bg-gradient-to-br from-fitnix/10 to-fitnix/5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex gap-4">
                      <div className="rounded-2xl border border-dashed border-gray-300 bg-white/50 p-4 text-center">
                        <span className="block text-xs text-gray-500">قبل</span>
                        <span className="block text-2xl font-black text-gray-400">?</span>
                      </div>
                      <div className="flex items-center">
                        <ArrowLeft className="h-6 w-6 text-fitnix" />
                      </div>
                      <div className="rounded-2xl border border-dashed border-gray-300 bg-white/50 p-4 text-center">
                        <span className="block text-xs text-gray-500">بعد</span>
                        <span className="block text-2xl font-black text-gray-400">!</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-right">
                  <h3 className="mb-1 text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="mb-3 text-sm text-gray-500">{item.goal}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{item.period}</span>
                    <span className="rounded-full bg-fitnix/10 px-3 py-1 text-sm font-bold text-fitnix">
                      {item.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <motion.div
            className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitnix/10 blur-[150px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl text-center">
          <motion.div {...fadeUp}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-fitnix/20 bg-fitnix/10 px-4 py-2 text-sm text-fitnix-light">
              <Star className="h-4 w-4" />
              عرض خاص لفترة محدودة
            </span>
            <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
              ابدأ رحلتك اليوم
            </h2>
            <p className="mb-4 text-lg text-white/60">
              العرض الخاص للمستخدمين الأوائل
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-10 max-w-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-fitnix/20 bg-white/5 p-8 backdrop-blur-xl">
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-fitnix/20 blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6">
                  <span className="inline-block rounded-full bg-fitnix/20 px-4 py-1 text-sm font-medium text-fitnix">
            شهري
                  </span>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl font-bold text-gray-400 line-through decoration-red-400">
                      100 SAR
                    </span>
                    <span className="text-6xl font-black text-white">59</span>
                    <span className="text-lg text-white/60">SAR</span>
                  </div>
                  <p className="mt-2 text-sm text-fitnix-light">
                    وفر 41% - عرض لفترة محدودة
                  </p>
                </div>

                <ul className="mb-8 space-y-4 text-right">
                  {[
                    "خطط تمارين AI مخصصة",
                    "تحليل تغذية بالكاميرا",
                    "مكتبة تمارين كاملة",
                    "مراجعة مدربين محترفين",
                    "تحديثات شهرية مجانية",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-fitnix" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-4 text-lg font-bold text-white shadow-lg shadow-fitnix/25 transition-all hover:shadow-xl hover:shadow-fitnix/40 active:scale-[0.98]"
                >
                  ابدأ الآن
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

{/* Why Fitnix Different - Replaces old comparison */}
      <WhyFitnixDifferent />

      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="mb-6 text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
              مستعد لتحويل جسمك؟
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500">
              انضم إلى ثورة الذكاء الاصطناعي في اللياقة. أول منصة عربية تجمع بين AI المتطور
              وخبرة المدربين المحترفين
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark px-10 py-4 text-lg font-bold text-white shadow-xl shadow-fitnix/25 transition-all hover:shadow-2xl hover:shadow-fitnix/40 active:scale-[0.98]"
            >
              ابدأ رحلتك مع Fitnix
              <ArrowLeft className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>

      <ComingSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
