"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, X, Info } from "lucide-react";

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

export default function Step4Plans({ onNext, onBack, data }: StepProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "quarterly" | null>(data?.plan || null);
  const [showDetails, setShowDetails] = useState<"monthly" | "quarterly" | null>(null);

  const plans = [
    {
      id: "monthly" as const,
      name: "عرض الصيف شهر",
      price: 35,
      originalPrice: 75,
      badge: "وفر 53%",
      features: [
        "خطة تمارين AI مخصصة",
        "تحليل تغذية بالكاميرا",
        "مكتبة تمارين كاملة",
        "مراجعة مدربين محترفين",
        "تحديثات أسبوعية",
        "دعم فني 24/7",
      ],
    },
    {
      id: "quarterly" as const,
      name: "عرض الصيف 3 شهور",
      price: 100,
      originalPrice: 230,
      badge: "وفر 57%",
      popular: true,
      features: [
        "كل مزايا الباقة الشهرية",
        "توفير 130 ريال",
        "خطة تغذية متكاملة",
        "استشارة مع مدرب خاص",
        "تقرير تقدم شهري",
        "أولوية الدعم الفني",
      ],
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <div className="text-center">
        <Sparkles className="mx-auto mb-2 h-8 w-8 text-fitnix" />
        <h2 className="text-2xl font-black text-gray-900">اختر باقتك</h2>
        <p className="mt-1 text-sm text-gray-500">عروض حصرية للمستخدمين الأوائل</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            className={`relative cursor-pointer overflow-hidden rounded-3xl border-2 p-6 transition-all ${
              selectedPlan === plan.id
                ? "border-fitnix bg-gradient-to-br from-fitnix/5 to-white shadow-xl shadow-fitnix/10"
                : "border-gray-100 bg-white shadow-sm hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
            whileHover={{ y: -3 }}
          >
            {plan.popular && (
              <div className="absolute -left-8 top-4 rotate-[-45deg] bg-gradient-to-r from-fitnix to-fitnix-dark px-8 py-1 text-[10px] font-bold text-white">
                الأكثر طلباً
              </div>
            )}

            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <span className="inline-block mt-1 rounded-full bg-fitnix/10 px-3 py-0.5 text-xs font-bold text-fitnix">
                  {plan.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowDetails(plan.id); }}
                className="text-gray-400 hover:text-fitnix"
              >
                <Info className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-5 flex items-baseline gap-2">
              <span className="text-sm text-gray-400 line-through">{plan.originalPrice} ريال</span>
              <span className="text-4xl font-black text-gray-900">{plan.price}</span>
              <span className="text-sm font-medium text-gray-500">ريال</span>
            </div>

            <ul className="space-y-2.5">
              {plan.features.slice(0, selectedPlan === plan.id ? 6 : 3).map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-fitnix" />
                  {f}
                </li>
              ))}
            </ul>

            <motion.div
              className={`mt-5 rounded-2xl border-2 py-3 text-center text-sm font-bold transition-all ${
                selectedPlan === plan.id
                  ? "border-fitnix bg-fitnix text-white"
                  : "border-gray-200 text-gray-500"
              }`}
            >
              {selectedPlan === plan.id ? "تم الاختيار" : "اختيار"}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-2xl border-2 border-gray-200 py-3.5 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50">
          السابق
        </button>
        <button
          onClick={() => selectedPlan && onNext({ plan: selectedPlan })}
          disabled={!selectedPlan}
          className="flex-1 rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-40"
        >
          متابعة الاشتراك - {selectedPlan ? (selectedPlan === "monthly" ? "35" : "100") : "—"} ريال
        </button>
      </div>

      {/* Plan Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowDetails(null)} />
            <motion.div className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
              <button onClick={() => setShowDetails(null)} className="absolute left-4 top-4 text-gray-400">
                <X className="h-5 w-5" />
              </button>
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                {plans.find((p) => p.id === showDetails)?.name}
              </h3>
              <ul className="space-y-3">
                {plans.find((p) => p.id === showDetails)?.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-fitnix" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
