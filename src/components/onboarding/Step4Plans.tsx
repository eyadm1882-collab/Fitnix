"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Info, X } from "lucide-react";

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
      name: "شهري",
      price: 35,
      originalPrice: 75,
      badge: "وفر 53%",
      features: [
        "خطة تمارين AI مخصصة",
        "تحليل تغذية بالكاميرا",
        "مكتبة تمارين كاملة",
        "تحديثات أسبوعية",
        "دعم فني 24/7",
      ],
    },
    {
      id: "quarterly" as const,
      name: "٣ شهور",
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
        "أولوية الدعم",
      ],
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
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
            className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 p-5 transition-all ${
              selectedPlan === plan.id
                ? "border-fitnix bg-gradient-to-br from-fitnix/5 to-white shadow-lg shadow-fitnix/10"
                : "border-gray-100 bg-white shadow-sm hover:shadow-md"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
            whileHover={{ y: -2 }}
          >
            {plan.popular && (
              <div className="absolute -left-8 top-4 rotate-[-45deg] bg-fitnix px-8 py-1 text-[10px] font-bold text-white">
                الأكثر طلباً
              </div>
            )}

            <div className="mb-3 flex items-start justify-between">
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowDetails(plan.id); }}
                className="text-gray-400 hover:text-fitnix transition-colors"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>

            <span className="inline-block mb-3 rounded-full bg-fitnix/10 px-2.5 py-0.5 text-[10px] font-bold text-fitnix">
              {plan.badge}
            </span>

            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-sm text-gray-400 line-through">{plan.originalPrice} ريال</span>
              <span className="text-3xl font-black text-gray-900">{plan.price}</span>
              <span className="text-xs text-gray-500">ريال</span>
            </div>

            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-fitnix" />
                  {f}
                </li>
              ))}
            </ul>

            <div className={`mt-4 rounded-xl border-2 py-2.5 text-center text-xs font-bold transition-all ${
              selectedPlan === plan.id
                ? "border-fitnix bg-fitnix text-white"
                : "border-gray-200 text-gray-500"
            }`}>
              {selectedPlan === plan.id ? "✓ تم الاختيار" : "اختيار"}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-secondary flex-1 py-3.5">السابق</button>
        <button
          onClick={() => selectedPlan && onNext({ plan: selectedPlan })}
          disabled={!selectedPlan}
          className="btn-primary flex-1 py-3.5"
        >
          متابعة الاشتراك — {selectedPlan ? (selectedPlan === "monthly" ? "35" : "100") : "—"} ريال
        </button>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowDetails(null)} />
          <motion.div
            className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 16 }}
          >
            <button onClick={() => setShowDetails(null)} className="absolute left-4 top-4 text-gray-400 hover:text-gray-600">
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
    </motion.div>
  );
}
