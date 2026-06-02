"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarDays, AlertCircle, Camera, Beef, Wheat, Droplets } from "lucide-react";

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

const ALL_DAYS = ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"];

export default function Step3Preferences({ onNext, onBack, data }: StepProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>(data?.days || []);
  const [protein, setProtein] = useState(data?.protein || "chicken");
  const [carbs, setCarbs] = useState(data?.carbs || "rice");
  const [fats, setFats] = useState(data?.fats || "mixed");
  const [photos, setPhotos] = useState<{ front: string | null; side: string | null; back: string | null }>(
    data?.photos || { front: null, side: null, back: null }
  );
  const [error, setError] = useState("");

  const MIN_DAYS = 3;
  const MAX_DAYS = 5;

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length <= MIN_DAYS) {
        setError(`يجب اختيار ${MIN_DAYS} أيام على الأقل`);
        return;
      }
      setSelectedDays(selectedDays.filter((d) => d !== day));
      setError("");
    } else {
      if (selectedDays.length >= MAX_DAYS) {
        setError(`يمكنك اختيار ${MAX_DAYS} أيام كحد أقصى`);
        return;
      }
      setSelectedDays([...selectedDays, day]);
      setError("");
    }
  };

  const handlePhotoUpload = (position: "front" | "side" | "back") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setPhotos((prev) => ({ ...prev, [position]: ev.target?.result as string }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = () => {
    if (selectedDays.length < MIN_DAYS) {
      setError(`يجب اختيار ${MIN_DAYS} أيام تدريب على الأقل`);
      return;
    }
    onNext({ days: selectedDays, protein, carbs, fats, photos });
  };

  const selectGrid = (
    label: string,
    options: { value: string; label: string; icon?: any }[],
    selected: string,
    onChange: (v: string) => void
  ) => (
    <div>
      <p className="mb-2 text-sm font-bold text-gray-700">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-xl border-2 px-3.5 py-2 text-xs font-bold transition-all ${
              selected === opt.value
                ? "border-fitnix bg-fitnix/10 text-fitnix"
                : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      {/* Training Days */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-fitnix" />
          <span className="text-sm font-bold text-gray-700">أيام التمرين</span>
          <span className="text-xs text-gray-400 mr-auto">
            {selectedDays.length}/{MAX_DAYS}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {ALL_DAYS.map((day) => {
            const isSelected = selectedDays.includes(day);
            const isFull = selectedDays.length >= MAX_DAYS && !isSelected;
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                disabled={isFull}
                className={`aspect-square rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-fitnix text-white shadow-sm"
                    : isFull
                    ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {day.slice(0, 1)}
              </button>
            );
          })}
        </div>
        <div className="flex justify-between mt-1.5">
          <p className="text-[10px] text-gray-400">اختر {MIN_DAYS}-{MAX_DAYS} أيام</p>
          {selectedDays.length > 0 && (
            <p className="text-[10px] text-fitnix font-medium">{selectedDays.length} أيام</p>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-100 p-3 text-xs font-medium text-amber-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Food Preferences */}
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-4">
        <p className="text-xs font-bold text-gray-500">التفضيلات الغذائية (اختياري)</p>
        {selectGrid("مصدر البروتين", [
          { value: "chicken", label: "دجاج" },
          { value: "fish", label: "سمك" },
          { value: "red-meat", label: "لحم أحمر" },
          { value: "plant-based", label: "نباتي" },
        ], protein, setProtein)}
        {selectGrid("مصدر الكربوهيدرات", [
          { value: "rice", label: "أرز" },
          { value: "potato", label: "بطاطا" },
          { value: "pasta", label: "معكرونة" },
          { value: "oats", label: "شوفان" },
          { value: "mixed", label: "متنوع" },
        ], carbs, setCarbs)}
        {selectGrid("مصدر الدهون", [
          { value: "olive-oil", label: "زيت زيتون" },
          { value: "nuts", label: "مكسرات" },
          { value: "avocado", label: "أفوكادو" },
          { value: "mixed", label: "متنوع" },
        ], fats, setFats)}
      </div>

      {/* Body Photos */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Camera className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-bold text-gray-700">صور الجسم (اختياري)</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["front", "side", "back"] as const).map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => handlePhotoUpload(pos)}
              className={`aspect-[3/4] rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                photos[pos] ? "border-fitnix/40 bg-fitnix/5" : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {photos[pos] ? (
                <img src={photos[pos]} alt="" className="h-full w-full object-cover rounded-xl" />
              ) : (
                <>
                  <Camera className="h-6 w-6 text-gray-300 mb-1" />
                  <span className="text-[10px] text-gray-400">
                    {pos === "front" ? "أمامي" : pos === "side" ? "جانبي" : "خلفي"}
                  </span>
                </>
              )}
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
