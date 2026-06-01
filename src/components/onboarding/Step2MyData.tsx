"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

export default function Step2MyData({ onNext, onBack, data }: StepProps) {
  const [height, setHeight] = useState(data?.height || 170);
  const [weight, setWeight] = useState(data?.weight || 70);
  const [goal, setGoal] = useState(data?.goal || "");
  const [location, setLocation] = useState(data?.location || "");
  const [showGoalInfo, setShowGoalInfo] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!goal) { setError("يرجى اختيار هدفك"); return; }
    if (!location) { setError("يرجى اختيار مكان التمرين"); return; }
    onNext({ height, weight, goal, location });
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {error && (
        <div className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">{error}</div>
      )}

      {/* Height Slider */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">الطول</span>
          <span className="text-lg font-black text-fitnix">{height} سم</span>
        </div>
        <input
          type="range"
          min="130"
          max="250"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-fitnix [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fitnix [&::-webkit-slider-thumb]:shadow-md"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>130 سم</span>
          <span>250 سم</span>
        </div>
      </div>

      {/* Weight Slider */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-700">الوزن</span>
          <span className="text-lg font-black text-fitnix">{weight} كجم</span>
        </div>
        <input
          type="range"
          min="35"
          max="180"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-fitnix [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fitnix [&::-webkit-slider-thumb]:shadow-md"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>35 كجم</span>
          <span>180 كجم</span>
        </div>
      </div>

      {/* Goal */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">ما هو هدفك؟</span>
          <button type="button" onClick={() => setShowGoalInfo(true)}>
            <Info className="h-4 w-4 text-gray-400 hover:text-fitnix" />
          </button>
        </div>
        <div className="flex gap-3">
          {[
            { value: "loss", label: "خسارة الوزن والدهون" },
            { value: "gain", label: "زيادة الوزن والعضلات" },
          ].map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => setGoal(g.value)}
              className={`flex-1 rounded-2xl border-2 py-4 text-sm font-bold transition-all ${
                goal === g.value
                  ? "border-fitnix bg-fitnix/10 text-fitnix"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Workout Location */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">مكان التمرين</span>
          <span className="group relative cursor-pointer">
            <Info className="h-4 w-4 text-gray-400 hover:text-fitnix" />
            <span className="invisible absolute -top-1 left-6 w-48 rounded-xl bg-gray-900 p-2 text-xs text-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
              اختر المكان الذي تفضل التمرين فيه
            </span>
          </span>
        </div>
        <div className="flex gap-3">
          {[
            { value: "gym", label: "نادي رياضي" },
            { value: "home", label: "المنزل" },
          ].map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => setLocation(l.value)}
              className={`flex-1 rounded-2xl border-2 py-4 text-sm font-bold transition-all ${
                location === l.value
                  ? "border-fitnix bg-fitnix/10 text-fitnix"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 rounded-2xl border-2 border-gray-200 py-3.5 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50"
        >
          السابق
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl"
        >
          التالي
        </button>
      </div>

      {/* Goal Info Modal */}
      <AnimatePresence>
        {showGoalInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowGoalInfo(false)} />
            <motion.div
              className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setShowGoalInfo(false)}
                className="absolute left-4 top-4 text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="mb-3 text-lg font-bold text-gray-900">شرح الأهداف</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><span className="font-bold text-fitnix">خسارة الوزن:</span> برنامج يركز على حرق الدهون مع الحفاظ على الكتلة العضلية</li>
                <li><span className="font-bold text-fitnix">زيادة العضلات:</span> برنامج تضخيم عضلي مع تغذية مكثفة وتمارين مقاومة</li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
