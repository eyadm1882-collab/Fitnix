"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Loader2, Scan, User, Ruler, Weight, Activity, Brain } from "lucide-react";

interface AnalysisResult {
  bodyFatEstimate: number | null;
  muscleMassEstimate: number | null;
  symmetryScore: number | null;
  postureNotes: string;
  fatDistribution: string;
  strengthPoints: string[];
  weaknessPoints: string[];
  recommendations: string[];
  generalNotes: string;
}

type PhotoKey = "front" | "side" | "back";

interface PhotoState { front: string | null; side: string | null; back: string | null; }

export default function BodyAnalysis() {
  const [photos, setPhotos] = useState<PhotoState>({ front: null, side: null, back: null });
  const [activeView, setActiveView] = useState<"upload" | "result" | "history">("upload");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [userInfo, setUserInfo] = useState({ weight: 75, height: 175, gender: "male" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<PhotoKey | null>(null);

  const handlePhotoUpload = (type: PhotoKey) => { setUploadingFor(type); inputRef.current?.click(); };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFor) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPhotos((prev) => ({ ...prev, [uploadingFor]: ev.target?.result as string })); };
    reader.readAsDataURL(file);
    setUploadingFor(null);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/body-analysis", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frontPhoto: photos.front, sidePhoto: photos.side, backPhoto: photos.back, ...userInfo }),
      });
      const data = await res.json();
      setResult(data.analysis);
      setActiveView("result");
    } catch { console.error("Analysis failed"); }
    finally { setLoading(false); }
  };

  const photoCard = (type: PhotoKey, label: string) => (
    <motion.button onClick={() => handlePhotoUpload(type)}
      className={`group relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all ${
        photos[type] ? "border-fitnix/40 bg-fitnix/5" : "border-gray-200 bg-gray-50 hover:border-fitnix/30"
      }`}
      whileHover={{ scale: 1.01 }}
    >
      {photos[type] ? (
        <>
          <img src={photos[type]} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute bottom-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur-sm">تغيير</div>
        </>
      ) : (
        <> <Camera className="mb-2 h-6 w-6 text-gray-300" /> <p className="text-xs text-gray-400">{label}</p> </>
      )}
    </motion.button>
  );

  return (
    <div className="space-y-5">
      <input ref={inputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelect} />

      <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
        {(["upload", "result", "history"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveView(tab)}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
              activeView === tab ? "bg-white text-fitnix shadow-sm" : "text-gray-500"
            }`}
          >
            {tab === "upload" ? "تحليل جديد" : tab === "result" ? "النتائج" : "السجل"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeView === "upload" && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900">
                <Camera className="h-4 w-4 text-fitnix" /> صور الجسم
              </h3>
              <div className="grid grid-cols-3 gap-3">{photoCard("front", "أمامي")}{photoCard("side", "جانبي")}{photoCard("back", "خلفي")}</div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900">
                <User className="h-4 w-4 text-fitnix" /> البيانات الأساسية
              </h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">الوزن (كجم)</label>
                  <div className="relative">
                    <Weight className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="number" value={userInfo.weight} onChange={(e) => setUserInfo((p) => ({ ...p, weight: Number(e.target.value) }))} className="input pr-10" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">الطول (سم)</label>
                  <div className="relative">
                    <Ruler className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="number" value={userInfo.height} onChange={(e) => setUserInfo((p) => ({ ...p, height: Number(e.target.value) }))} className="input pr-10" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">الجنس</label>
                  <select value={userInfo.gender} onChange={(e) => setUserInfo((p) => ({ ...p, gender: e.target.value }))} className="select">
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
              </div>
            </div>

            <button onClick={handleAnalyze} disabled={loading} className="btn-primary w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Scan className="h-4 w-4" />}
              {loading ? "جاري التحليل..." : "تحليل الجسم بالذكاء الاصطناعي"}
            </button>
          </motion.div>
        )}

        {activeView === "result" && result && (
          <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "نسبة الدهون", value: result.bodyFatEstimate ? `${result.bodyFatEstimate}%` : "--", icon: Activity, color: "from-blue-500 to-cyan-500" },
                { label: "كتلة العضلات", value: result.muscleMassEstimate ? `${result.muscleMassEstimate}%` : "--", icon: Brain, color: "from-fitnix to-emerald-600" },
                { label: "التناسق", value: result.symmetryScore ? `${result.symmetryScore}/10` : "--", icon: Scan, color: "from-purple-500 to-pink-500" },
              ].map((stat, i) => (
                <motion.div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className={`mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-sm`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-lg font-black text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h4 className="mb-2 text-sm font-bold text-gray-900">الوضعية</h4>
                <p className="text-sm leading-relaxed text-gray-600">{result.postureNotes}</p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h4 className="mb-2 text-sm font-bold text-gray-900">توزيع الدهون</h4>
                <p className="text-sm leading-relaxed text-gray-600">{result.fatDistribution}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-green-100 bg-green-50 p-4">
                <h4 className="mb-2 text-sm font-bold text-green-800">نقاط القوة</h4>
                <ul className="space-y-1.5">{result.strengthPoints.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-green-700"><div className="h-1.5 w-1.5 rounded-full bg-green-500" /> {p}</li>
                ))}</ul>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <h4 className="mb-2 text-sm font-bold text-amber-800">نقاط الضعف</h4>
                <ul className="space-y-1.5">{result.weaknessPoints.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-amber-700"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {p}</li>
                ))}</ul>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-blue-800"><Activity className="h-4 w-4" /> التوصيات</h4>
              <ul className="space-y-2">{result.recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-200 text-[10px] font-bold text-blue-700">{i + 1}</span>{r}
                </li>
              ))}</ul>
            </div>

            {result.generalNotes && (
              <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                <h4 className="mb-2 text-sm font-bold text-gray-900">ملاحظات عامة</h4>
                <p className="text-sm leading-relaxed text-gray-600">{result.generalNotes}</p>
              </div>
            )}

            <button onClick={() => setActiveView("upload")} className="btn-primary w-full">
              <Camera className="h-4 w-4" /> تحليل جديد
            </button>
          </motion.div>
        )}

        {activeView === "history" && (
          <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <Activity className="mx-auto mb-3 h-8 w-8 text-gray-300" />
            <p className="text-sm text-gray-500">سجل التحليلات</p>
            <p className="text-xs text-gray-400">سيتم حفظ التحليلات بعد ربط قاعدة البيانات</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
