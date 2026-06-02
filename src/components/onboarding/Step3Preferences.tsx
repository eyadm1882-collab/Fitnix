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

  const MIN_DAYS = 3;
  const MAX_DAYS = 5;

  const toggleDay = (day: string) => {
    setError("");
    if (days.includes(day)) {
      if (days.length <= MIN_DAYS) return;
      setDays((prev) => prev.filter((d) => d !== day));
    } else {
      if (days.length >= MAX_DAYS) return;
      setDays((prev) => [...prev, day]);
    }
  };

  const toggleItem = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, setter: (v: string) => void) => {
    const file = e.target.files?.[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (days.length < MIN_DAYS || days.length > MAX_DAYS) {
      setError(`يرجى اختيار من ${MIN_DAYS} إلى ${MAX_DAYS} أيام`);
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

  const isDayDisabled = (day: string) => {
    if (days.includes(day)) return false;
    return days.length >= MAX_DAYS;
  };

  const canProceed = days.length >= MIN_DAYS && days.length <= MAX_DAYS;

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600"
        >
          {error}
        </motion.div>
      )}

      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">أيام التمرين</span>
          <span className="text-sm text-red-500">*</span>
          <span className="mr-auto rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">
            {days.length}/{MAX_DAYS}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {allDays.map((day) => {
            const selected = days.includes(day);
            const disabled = isDayDisabled(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                disabled={disabled && !selected}
                className={`rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
                  selected
                    ? "border-fitnix bg-fitnix/10 text-fitnix shadow-sm"
                    : disabled
                    ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex items-center gap-2">
          {days.length < MIN_DAYS && (
            <p className="text-xs text-amber-600">
              اختر {MIN_DAYS - days.length} أيام إضافية على الأقل
            </p>
          )}
          {days.length >= MIN_DAYS && days.length < MAX_DAYS && (
            <p className="text-xs text-fitnix">
              ✓ {days.length} أيام - يمكنك إضافة {MAX_DAYS - days.length} أيام إضافية
            </p>
          )}
          {days.length === MAX_DAYS && (
            <p className="text-xs text-fitnix font-bold">✓ {days.length} أيام - اختيار ممتاز!</p>
          )}
        </div>
      </div>

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
                  ? "border-fitnix bg-fitnix/10 text-fitnix shadow-sm"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

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
                  ? "border-fitnix bg-fitnix/10 text-fitnix shadow-sm"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

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
                  ? "border-fitnix bg-fitnix/10 text-fitnix shadow-sm"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-sm font-bold text-gray-700">صور الجسم</span>
          <button type="button" onClick={() => setShowPhotoHelp(true)} className="transition-colors hover:text-fitnix">
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </button>
          <span className="text-[10px] text-gray-400">(اختياري)</span>
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

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 rounded-2xl border-2 border-gray-200 py-3.5 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50 hover:border-gray-300"
        >
          السابق
        </button>
        <button
          onClick={handleSubmit}
          className={`flex-1 rounded-2xl py-3.5 text-sm font-bold text-white shadow-lg transition-all ${
            canProceed
              ? "bg-gradient-to-r from-fitnix to-fitnix-dark hover:shadow-xl active:scale-[0.98]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!canProceed}
        >
          التالي
        </button>
      </div>

      <AnimatePresence>
        {showPhotoHelp && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPhotoHelp(false)} />
            <motion.div
              className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button onClick={() => setShowPhotoHelp(false)} className="absolute left-4 top-4 text-gray-400 hover:text-gray-600 transition-colors">
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
