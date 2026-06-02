"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, UtensilsCrossed, Beef, Wheat, Droplets } from "lucide-react";

export interface MealPlanInput {
  goal: string; weight: number; height: number; gender: string;
  age: number; trainingDays: number; protein: string; carbs: string; fats: string;
}

interface MealPlanFormProps {
  onGenerate: (input: MealPlanInput) => void;
  loading: boolean;
}

export default function MealPlanForm({ onGenerate, loading }: MealPlanFormProps) {
  const [form, setForm] = useState<MealPlanInput>({
    goal: "gain", weight: 75, height: 175, gender: "male", age: 25,
    trainingDays: 4, protein: "chicken", carbs: "rice", fats: "mixed",
  });

  const update = (key: keyof MealPlanInput, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onGenerate(form); };

  const rangeSlider = (key: keyof MealPlanInput, label: string, min: number, max: number, unit: string) => (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold text-fitnix">{String(form[key])}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={form[key] as number}
        onChange={(e) => update(key, Number(e.target.value))}
        className="w-full h-2 rounded-full bg-gray-200 appearance-none cursor-pointer accent-fitnix"
      />
    </div>
  );

  const selectGrid = (key: keyof MealPlanInput, label: string, options: { value: string; label: string }[]) => (
    <div>
      <p className="mb-2 text-sm font-bold text-gray-700">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button key={opt.value} type="button" onClick={() => update(key, opt.value)}
            className={`rounded-lg border-2 px-3.5 py-2 text-xs font-bold transition-all ${
              form[key] === opt.value ? "border-fitnix bg-fitnix/10 text-fitnix" : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.form onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="grid gap-5 sm:grid-cols-2">
        {selectGrid("goal", "الهدف", [
          { value: "gain", label: "تضخيم" }, { value: "loss", label: "تنحيف" }, { value: "maintain", label: "محافظة" },
        ])}
        {selectGrid("gender", "الجنس", [{ value: "male", label: "ذكر" }, { value: "female", label: "أنثى" }])}
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {rangeSlider("age", "العمر", 14, 80, "")}
        {rangeSlider("weight", "الوزن", 40, 180, " كجم")}
        {rangeSlider("height", "الطول", 140, 220, " سم")}
      </div>

      {rangeSlider("trainingDays", "أيام التمرين", 0, 7, " أيام")}

      <div className="grid gap-5 sm:grid-cols-3">
        {selectGrid("protein", "مصدر البروتين", [
          { value: "chicken", label: "دجاج" }, { value: "fish", label: "سمك" },
          { value: "red-meat", label: "لحم أحمر" }, { value: "plant-based", label: "نباتي" },
        ])}
        {selectGrid("carbs", "مصدر الكربوهيدرات", [
          { value: "rice", label: "أرز" }, { value: "potato", label: "بطاطا" },
          { value: "pasta", label: "معكرونة" }, { value: "oats", label: "شوفان" }, { value: "mixed", label: "متنوع" },
        ])}
        {selectGrid("fats", "مصدر الدهون", [
          { value: "olive-oil", label: "زيت زيتون" }, { value: "nuts", label: "مكسرات" },
          { value: "avocado", label: "أفوكادو" }, { value: "mixed", label: "متنوع" },
        ])}
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UtensilsCrossed className="h-4 w-4" />}
        {loading ? "جاري إنشاء الخطة..." : "إنشاء خطة التغذية"}
      </button>
    </motion.form>
  );
}
