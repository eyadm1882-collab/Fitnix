"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, RefreshCw, Sparkles } from "lucide-react";
import MealPlanForm, { MealPlanInput } from "@/components/nutrition/MealPlanForm";
import MealPlanResult from "@/components/nutrition/MealPlanResult";

interface MealPlan {
  dailyCalories: number;
  protein: { grams: number; calories: number };
  carbs: { grams: number; calories: number };
  fats: { grams: number; calories: number };
  waterMl: number;
  meals: any[];
  shoppingList: string[];
}

export default function MealPlanPage() {
  const [plan, setPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = async (input: MealPlanInput) => {
    setLoading(true);
    setHasGenerated(true);
    try {
      const res = await fetch("/api/meal-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      setPlan(data.plan);
    } catch {
      console.error("Failed to generate meal plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <div className="container-premium pt-20 pb-10">
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            {!hasGenerated ? (
              <motion.div key="form" exit={{ opacity: 0, y: -16 }}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm">
                    <UtensilsCrossed className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-gray-900">خطة التغذية الذكية</h1>
                    <p className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Sparkles className="h-3.5 w-3.5 text-fitnix" />
                      أدخل معلوماتك لإنشاء خطة وجبات مخصصة
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                  <MealPlanForm onGenerate={handleGenerate} loading={loading} />
                </div>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, y: 16 }}>
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-fitnix/5"
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <UtensilsCrossed className="h-8 w-8 text-fitnix" />
                    </motion.div>
                    <p className="mt-4 text-sm text-gray-400">جاري إنشاء خطة التغذية...</p>
                  </div>
                ) : plan ? (
                  <>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-50">
                          <UtensilsCrossed className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h1 className="text-xl font-black text-gray-900">خطة التغذية</h1>
                          <p className="text-xs text-gray-500">خطة مخصصة حسب أهدافك</p>
                        </div>
                      </div>
                      <button onClick={() => setHasGenerated(false)} className="btn-ghost btn-sm !text-fitnix">
                        <RefreshCw className="h-3.5 w-3.5" />
                        تخصيص جديد
                      </button>
                    </div>
                    <MealPlanResult plan={plan} />
                  </>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
