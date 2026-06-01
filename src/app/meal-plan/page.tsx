"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UtensilsCrossed, RefreshCw } from "lucide-react";
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
      <div className="mx-auto max-w-4xl px-4 pt-24 pb-12 sm:px-6">
        <AnimatePresence mode="wait">
          {!hasGenerated ? (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
              <MealPlanForm onGenerate={handleGenerate} loading={loading} />
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }}>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-fitnix/10 to-fitnix/5"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <UtensilsCrossed className="h-10 w-10 text-fitnix" />
                  </motion.div>
                  <motion.p className="mt-4 text-sm text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    جاري إنشاء خطة التغذية الذكية...
                  </motion.p>
                </div>
              ) : plan ? (
                <>
                  <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-black text-gray-900">خطة التغذية</h1>
                    <motion.button
                      onClick={() => setHasGenerated(false)}
                      className="flex items-center gap-2 rounded-xl bg-fitnix/5 px-4 py-2.5 text-xs font-bold text-fitnix transition-all hover:bg-fitnix/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      تخصيص جديد
                    </motion.button>
                  </div>
                  <MealPlanResult plan={plan} />
                </>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
