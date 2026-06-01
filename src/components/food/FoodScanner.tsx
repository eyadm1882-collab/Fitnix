"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Loader2, Scan, Beef, Apple, Flame, Droplets, Wheat, Star, Plus, CheckCircle2 } from "lucide-react";

interface FoodAnalysis {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
  servingSize: string;
  mealType: string;
  healthScore: number;
  tips: string[];
  ingredients: string[];
}

interface FoodLog {
  id: string;
  date: string;
  mealType: string;
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: string;
}

export default function FoodScanner() {
  const [showScanner, setShowScanner] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [foodText, setFoodText] = useState("");
  const [portion, setPortion] = useState("حصة متوسطة");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FoodAnalysis | null>(null);
  const [logs, setLogs] = useState<FoodLog[]>([]);
  const [activeTab, setActiveTab] = useState<"scan" | "diary">("scan");
  const [showTipIndex, setShowTipIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [logged, setLogged] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const dailyLogs = logs.filter((l) => l.date === today);
  const totalCals = dailyLogs.reduce((s, l) => s + l.calories, 0);
  const totalProtein = dailyLogs.reduce((s, l) => s + l.protein, 0);

  const handlePhotoCapture = () => {
    inputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!foodText.trim()) return;
    setLoading(true);
    setResult(null);
    setLogged(false);

    try {
      const res = await fetch("/api/food/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodDescription: foodText, portionSize: portion }),
      });
      const data = await res.json();
      setResult(data.analysis);
      setShowScanner(false);
    } catch {
      console.error("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogFood = () => {
    if (!result) return;
    const log: FoodLog = {
      id: crypto.randomUUID(),
      date: today,
      mealType: result.mealType,
      foodName: result.foodName,
      calories: result.calories,
      protein: result.protein,
      carbs: result.carbs,
      fats: result.fats,
      timestamp: new Date().toLocaleTimeString("ar-SA"),
    };
    const updated = [...logs, log];
    setLogs(updated);
    localStorage.setItem("fitnix_food_logs", JSON.stringify(updated));
    setLogged(true);
  };

  const portionSizes = ["حصة صغيرة", "حصة متوسطة", "حصة كبيرة", "كوب واحد", "طبق كامل"];

  return (
    <div className="space-y-6">
      <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelect} />

      {/* Tabs */}
      <div className="flex gap-2">
        {(["scan", "diary"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
              activeTab === tab ? "bg-gradient-to-r from-fitnix to-fitnix-dark text-white shadow-lg" : "bg-white text-gray-500 ring-1 ring-gray-200"
            }`}
          >
            {tab === "scan" ? "📸 ماسح الطعام" : "📋 يومياتي"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "scan" && (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
            {/* Photo Upload */}
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center transition-all hover:border-fitnix/30">
              {photo ? (
                <div className="relative mx-auto max-w-xs">
                  <img src={photo} alt="Food" className="mx-auto max-h-56 rounded-2xl object-cover shadow-lg" />
                  <button onClick={() => setPhoto(null)} className="mt-2 text-xs text-gray-400 hover:text-red-500">إزالة الصورة</button>
                </div>
              ) : (
                <button onClick={handlePhotoCapture} className="w-full">
                  <Camera className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                  <p className="text-sm font-medium text-gray-500">صور طعامك بالكاميرا</p>
                  <p className="mt-1 text-xs text-gray-400">أو اضغط لاختيار صورة</p>
                </button>
              )}
            </div>

            {/* Food Description */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">وصف الطعام</label>
              <textarea value={foodText} onChange={(e) => setFoodText(e.target.value)}
                placeholder="مثلاً: شاورما دجاج مع خبز و بطاطس و حمص"
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-900 outline-none transition-all focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
                rows={3} dir="rtl"
              />
            </div>

            {/* Portion Size */}
            <div>
              <p className="mb-2 text-sm font-bold text-gray-700">حجم الحصة</p>
              <div className="flex flex-wrap gap-2">
                {portionSizes.map((s) => (
                  <button key={s} onClick={() => setPortion(s)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      portion === s ? "bg-gradient-to-r from-fitnix to-fitnix-dark text-white shadow-lg" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleAnalyze}
              disabled={loading || !foodText.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Scan className="h-5 w-5" />}
              {loading ? "AI يحلل الطعام..." : "🔍 تحليل بالذكاء الاصطناعي"}
            </motion.button>

            {/* Analysis Result */}
            <AnimatePresence>
              {result && !showScanner && (
                <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-black text-gray-900">{result.foodName}</h3>
                        <p className="text-xs text-gray-400">{result.servingSize} · {result.mealType}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className={`h-4 w-4 ${result.healthScore >= 7 ? "text-yellow-400 fill-yellow-400" : result.healthScore >= 4 ? "text-yellow-400" : "text-gray-300"}`} />
                        <span className="text-sm font-bold text-gray-700">{result.healthScore}/10</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {[
                        { label: "سعرات", value: result.calories, icon: Flame, color: "from-red-500 to-orange-500" },
                        { label: "بروتين", value: `${result.protein}جم`, icon: Beef, color: "from-fitnix to-emerald-600" },
                        { label: "كارب", value: `${result.carbs}جم`, icon: Wheat, color: "from-amber-500 to-yellow-500" },
                        { label: "دهون", value: `${result.fats}جم`, icon: Droplets, color: "from-blue-500 to-indigo-500" },
                        { label: "ألياف", value: `${result.fiber}جم`, icon: Apple, color: "from-green-500 to-teal-500" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-xl bg-gray-50 p-2 text-center">
                          <div className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ${s.color}`}>
                            <s.icon className="h-3.5 w-3.5 text-white" />
                          </div>
                          <p className="text-xs font-black text-gray-900">{s.value}</p>
                          <p className="text-[8px] text-gray-400">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {result.ingredients.length > 0 && (
                      <div className="mb-3">
                        <p className="mb-1 text-xs font-bold text-gray-500">المكونات</p>
                        <div className="flex flex-wrap gap-1.5">
                          {result.ingredients.map((ing, i) => (
                            <span key={i} className="rounded-lg bg-fitnix/5 px-2.5 py-1 text-[10px] text-fitnix">{ing}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.tips.length > 0 && (
                      <div className="mb-4 rounded-xl bg-blue-50 p-3">
                        <p className="mb-1 text-xs font-bold text-blue-700">💡 نصائح</p>
                        {result.tips.map((tip, i) => (
                          <p key={i} className="text-xs text-blue-600">{tip}</p>
                        ))}
                      </div>
                    )}

                    <motion.button
                      onClick={handleLogFood}
                      disabled={logged}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all ${
                        logged ? "bg-green-50 text-green-600" : "bg-gradient-to-r from-fitnix to-fitnix-dark text-white shadow-lg hover:shadow-xl"
                      }`}
                      whileHover={logged ? {} : { scale: 1.01 }}
                    >
                      {logged ? <><CheckCircle2 className="h-4 w-4" /> تم التسجيل ✓</> : <><Plus className="h-4 w-4" /> تسجيل في اليوميات</>}
                    </motion.button>
                  </div>

                  <button onClick={() => { setResult(null); setShowScanner(true); }} className="w-full rounded-xl bg-gray-50 py-3 text-xs font-medium text-gray-500 hover:bg-gray-100">
                    مسح وجبة جديدة
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === "diary" && (
          <motion.div key="diary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Today's Summary */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-bold text-gray-900">📊 ملخص اليوم</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-gradient-to-br from-orange-50 to-red-50 p-3">
                  <p className="text-2xl font-black text-orange-600">{totalCals}</p>
                  <p className="text-[10px] text-orange-400">سعرة</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-fitnix/5 to-emerald-50 p-3">
                  <p className="text-2xl font-black text-fitnix">{totalProtein.toFixed(0)}</p>
                  <p className="text-[10px] text-gray-400">بروتين (جم)</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 p-3">
                  <p className="text-2xl font-black text-amber-600">{dailyLogs.length}</p>
                  <p className="text-[10px] text-amber-400">وجبات</p>
                </div>
              </div>
            </div>

            {dailyLogs.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <Apple className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                <p className="text-sm text-gray-500">لم تسجل أي وجبة اليوم</p>
                <p className="text-xs text-gray-400">امسح وجبتك الأولى الآن</p>
              </div>
            ) : (
              <div className="space-y-2">
                {dailyLogs.map((log) => (
                  <motion.div key={log.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fitnix/5">
                        <Apple className="h-4 w-4 text-fitnix" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{log.foodName}</p>
                        <p className="text-[10px] text-gray-400">{log.mealType} · {log.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-gray-900">{log.calories}</p>
                      <p className="text-[10px] text-gray-400">سعرة</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <button onClick={() => { setActiveTab("scan"); setShowScanner(true); }} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3.5 text-sm font-bold text-white shadow-lg">
              <Camera className="h-4 w-4" />
              امسح وجبة جديدة
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
