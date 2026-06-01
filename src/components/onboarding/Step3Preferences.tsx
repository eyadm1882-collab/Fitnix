"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, HelpCircle } from "lucide-react";

const allDays = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
const proteins = ["بيض كامل", "صدور دجاج", "لحم بقري", "سمك فيليه أبيض", "تونة"];
const carbs = ["شوفان", "رز", "بطاطس", "بطاطس حلوة", "مكرونة"];
const fats = ["فستق", "أفوكادو", "كاجو", "فول سوداني"];

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

export default function Step3Preferences({ onNext, onBack, data }: StepProps) {
  const [days, setDays] = useState<string[]>(data?.days || []);
  const [selectedProteins, setSelectedProteins] = useState<string[]>(data?.proteins || []);
  const [selectedCarbs, setSelectedCarbs] = useState<string[]>(data?.carbs || []);
  const [selectedFats, setSelectedFats] = useState<string[]>(data?.fats || []);
  const [uploadedFront, setUploadedFront] = useState<string | null>(null);
  const [uploadedSide, setUploadedSide] = useState<string | null>(null);
  const [uploadedBack, setUploadedBack] = useState<string | null>(null);
  const [showPhotoHelp, setShowPhotoHelp] = useState(false);
  const [error, setError] = useState("");

  const toggleDay = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev]
    );
  };

  const toggleItem = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (days.length < 3 || days.length > 5) {
      setError("يرجى اختيار من 3 إلى 5 أيام");
      return;
    }
    if (selectedProteins.length !== 4) {
      setError("يرجى اختيار 4 مصادر بروتين بالضبط");
      return;
    }
    if (selectedCarbs.length !== 3) {
      setError("يرجى اختيار 3 مصادر كارب بالضبط");
      return;
    }
    if (selectedFats.length !== 1) {
      setError("يرجى اختيار مصدر دهون واحد بالضبط");
      return;
    }
    onNext({ days, proteins: selectedProteins, carbs: selectedCarbs, fats: selectedFats });
  };

  return (
    <motion.div
      className="space-y-7"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {error && (
        <div className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">{error}</div>
      )}

      {/* Workout Days */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">أيام التمرين</span>
          <span className="text-sm text-red-500">*</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {allDays.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                days.includes(day)
                  ? "border-fitnix bg-fitnix/10 text-fitnix"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        {days.length >= 3 && days.length <= 5 && (
          <p className="mt-2 text-xs text-fitnix">{days.length} أيام - {days.length < 5 ? "ننصح بـ 5 أيام" : "ممتاز!"}</p>
        )}
      </div>

      {/* Protein */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">مصادر البروتين</span>
          <span className="rounded-full bg-fitnix/10 px-2 py-0.5 text-[10px] font-bold text-fitnix">اختر 4</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {proteins.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleItem(item, selectedProteins, setSelectedProteins)}
              className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                selectedProteins.includes(item)
                  ? "border-fitnix bg-fitnix/10 text-fitnix"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Carbs */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">مصادر الكارب</span>
          <span className="rounded-full bg-fitnix/10 px-2 py-0.5 text-[10px] font-bold text-fitnix">اختر 3</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {carbs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleItem(item, selectedCarbs, setSelectedCarbs)}
              className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                selectedCarbs.includes(item)
                  ? "border-fitnix bg-fitnix/10 text-fitnix"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Fats */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">مصادر الدهون</span>
          <span className="rounded-full bg-fitnix/10 px-2 py-0.5 text-[10px] font-bold text-fitnix">اختر 1</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {fats.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggleItem(item, selectedFats, setSelectedFats)}
              className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                selectedFats.includes(item)
                  ? "border-fitnix bg-fitnix/10 text-fitnix"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">صور الجسم</span>
          <button type="button" onClick={() => setShowPhotoHelp(true)}>
            <HelpCircle className="h-4 w-4 text-gray-400 hover:text-fitnix" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "أمامي", ref: uploadedFront, setter: setUploadedFront },
            { label: "جانبي", ref: uploadedSide, setter: setUploadedSide },
            { label: "خلفي", ref: uploadedBack, setter: setUploadedBack },
          ].map((item) => (
            <label key={item.label} className="cursor-pointer">
              <div className={`flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${
                item.ref ? "border-fitnix bg-fitnix/5" : "border-gray-200 bg-white hover:border-gray-300"
              }`}>
                {item.ref ? (
                  <img src={item.ref} alt={item.label} className="h-full w-full rounded-2xl object-cover" />
                ) : (
                  <>
                    <span className="text-2xl opacity-30">📷</span>
                    <span className="mt-1 text-[10px] text-gray-400">{item.label}</span>
                  </>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e, item.setter)} />
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 rounded-2xl border-2 border-gray-200 py-3.5 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50">
          السابق
        </button>
        <button onClick={handleSubmit} className="flex-1 rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl">
          التالي
        </button>
      </div>

      {/* Photo Help Modal */}
      <AnimatePresence>
        {showPhotoHelp && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowPhotoHelp(false)} />
            <motion.div className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
              <button onClick={() => setShowPhotoHelp(false)} className="absolute left-4 top-4 text-gray-400">
                <X className="h-5 w-5" />
              </button>
              <h3 className="mb-3 text-lg font-bold text-gray-900">تعليمات التصوير</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>صورة الوجه اختيارية</li>
                <li>الأهم هو تصوير الجسم بوضوح</li>
                <li>إضاءة جيدة وخلفية بسيطة</li>
                <li>ملابس رياضية مناسبة</li>
                <li>الوقوف بوضعية مستقيمة</li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
