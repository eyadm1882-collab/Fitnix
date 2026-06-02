"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info, Ruler, Weight, Target, MapPin } from "lucide-react";

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
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!goal) { setError("يرجى اختيار هدفك"); return; }
    if (!location) { setError("يرجى اختيار مكان التمرين"); return; }
    onNext({ height, weight, goal, location });
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-sm font-medium text-red-600">{error}</div>
      )}

      {/* Height */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Ruler className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-700">الطول</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="130" max="250" value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="flex-1 h-2 rounded-full bg-gray-200 appearance-none cursor-pointer accent-fitnix"
          />
          <span className="w-16 text-center text-lg font-black text-fitnix">{height}</span>
          <span className="text-xs text-gray-400">سم</span>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>130 سم</span>
          <span>250 سم</span>
        </div>
      </div>

      {/* Weight */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Weight className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-700">الوزن</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="35" max="180" value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="flex-1 h-2 rounded-full bg-gray-200 appearance-none cursor-pointer accent-fitnix"
          />
          <span className="w-16 text-center text-lg font-black text-fitnix">{weight}</span>
          <span className="text-xs text-gray-400">كجم</span>
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>35 كجم</span>
          <span>180 كجم</span>
        </div>
      </div>

      {/* Goal */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Target className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-700">ما هو هدفك؟</span>
        </div>
        <div className="flex gap-3">
          {[
            { value: "loss", label: "خسارة الوزن" },
            { value: "gain", label: "زيادة العضلات" },
          ].map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => setGoal(g.value)}
              className={`flex-1 rounded-xl border-2 py-3.5 text-sm font-bold transition-all ${
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

      {/* Location */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-700">مكان التمرين</span>
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
              className={`flex-1 rounded-xl border-2 py-3.5 text-sm font-bold transition-all ${
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

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn-secondary flex-1 py-3.5">السابق</button>
        <button onClick={handleSubmit} className="btn-primary flex-1 py-3.5">التالي</button>
      </div>
    </motion.div>
  );
}
