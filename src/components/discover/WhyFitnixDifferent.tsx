"use client";

import { motion } from "framer-motion";
import { CheckCircle2, X, Zap, Brain, Users, Dumbbell, Camera, BookOpen } from "lucide-react";

export default function WhyFitnixDifferent() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Animated Dual-line AI Branding */}
        <div className="mb-20 overflow-hidden text-center">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Top line: FITNIX AI - Green */}
            <motion.div
              className="text-5xl font-black leading-none sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="bg-gradient-to-r from-fitnix to-fitnix-light bg-clip-text text-transparent">
                FITNIX AI
              </span>
            </motion.div>

            {/* Bottom line: AI - Red */}
            <motion.div
              className="text-5xl font-black leading-none tracking-wider text-red-500 sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ y: -60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              AI
            </motion.div>
          </motion.div>

          <motion.p
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span>Fitnix هو المنصة الوحيدة المتخصصة بالكامل في اللياقة البدنية والتغذية، مدعومة بذكاء اصطناعي مطور خصيصا لهذا المجال</span>
          </motion.p>
        </div>

        {/* Premium Comparison Cards */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Fitnix Card - Highlighted */}
          <motion.div
            className="relative overflow-hidden rounded-3xl border-2 border-fitnix/30 bg-gradient-to-br from-fitnix/5 to-white shadow-xl shadow-fitnix/10 lg:col-span-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-fitnix/10 blur-3xl" />
            <div className="relative z-10 p-6 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-xl bg-fitnix px-4 py-2">
                <Zap className="h-4 w-4 text-white" />
                <span className="text-lg font-black text-white">Fitnix</span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                منصة متخصصة بالكامل في اللياقة
              </p>
              <ul className="space-y-3 text-right">
                {[
                  { text: "متخصص في اللياقة", ok: true },
                  { text: "خطط تمارين مخصصة", ok: true },
                  { text: "مراجعة مدربين", ok: true },
                  { text: "تحليل تغذية بالكاميرا", ok: true },
                  { text: "بناء من كتب وعلوم رياضية", ok: true },
                  { text: "محتوى عربي كامل", ok: true },
                  { text: "مكتبة فيديوهات تمارين", ok: true },
                  { text: "تكيف أسبوعي مع تقدمك", ok: true },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-fitnix" />
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Competitor Cards */}
          {[
            {
              name: "ChatGPT",
              desc: "مساعد عام متعدد المجالات",
              icon: Brain,
              features: [true, false, false, false, false, true, false, false],
            },
            {
              name: "AI",
              desc: "مساعد عام متعدد المجالات",
              icon: Brain,
              features: [true, false, false, false, false, true, false, false],
            },
            {
              name: "أدوات AI عامة",
              desc: "حلول غير متخصصة",
              icon: Brain,
              features: [true, false, false, false, false, false, false, false],
            },
          ].map((competitor, idx) => (
            <motion.div
              key={competitor.name}
              className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * (idx + 1) }}
              whileHover={{ y: -3 }}
            >
              <div className="p-6 text-center">
                <div className="mb-3 inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2">
                  <competitor.icon className="h-4 w-4 text-gray-500" />
                  <span className="text-base font-bold text-gray-500">{competitor.name}</span>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-gray-400">{competitor.desc}</p>
                <ul className="space-y-3 text-right">
                  {[
                    "متخصص في اللياقة",
                    "خطط تمارين مخصصة",
                    "مراجعة مدربين",
                    "تحليل تغذية بالكاميرا",
                    "بناء من كتب وعلوم رياضية",
                    "محتوى عربي كامل",
                    "مكتبة فيديوهات تمارين",
                    "تكيف أسبوعي",
                  ].map((text, i) => (
                    <li key={text} className="flex items-center gap-2 text-sm text-gray-400">
                      {competitor.features[i] ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-green-300" />
                      ) : (
                        <X className="h-4 w-4 shrink-0 text-gray-300" />
                      )}
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Badge */}
        <motion.div
          className="mx-auto mt-12 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-fitnix/10 bg-fitnix/[0.03] px-6 py-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Zap className="h-5 w-5 text-fitnix" />
          <span className="text-sm font-medium text-gray-600">
            Fitnix هو الحل المتخصص الوحيد - بقية الأدوات عامة وغير مخصصة للمجال الرياضي
          </span>
        </motion.div>
      </div>
    </section>
  );
}
