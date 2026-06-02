"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Dumbbell, Bot, UtensilsCrossed, Camera, Scan, Sparkles,
  CalendarDays, Activity, Flame, AlertCircle, CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import WorkoutDayCard from "@/components/workout/WorkoutDayCard";
import ApprovalGate from "@/components/workout/ApprovalGate";

const DAY_ORDER = ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"];

const getDefaultDays = () => ["الاثنين", "الأربعاء", "الجمعة"];

interface Exercise {
  name: string;
  muscleGroup: string;
  sets: string | number;
  reps: string;
  notes?: string;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

interface Stats {
  activeSubscriptions: number;
  knowledgeDocuments: number;
  totalUsers: number;
}

function DashboardContent() {
  const [workout, setWorkout] = useState<WorkoutDay[]>([]);
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const saved = localStorage.getItem("fitnix_workout_data");
    if (saved) setUserData(JSON.parse(saved));
    const userName = localStorage.getItem("fitnix_user_name");
    if (!userName) localStorage.setItem("fitnix_user_name", "البطل");
  }, []);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const userName = typeof window !== "undefined" ? localStorage.getItem("fitnix_user_name") || "البطل" : "البطل";

  const generatePlan = useCallback(async () => {
    setLoading(true); setError("");
    const saved = localStorage.getItem("fitnix_workout_data");
    const d = saved ? JSON.parse(saved) : {};
    const days = d.days || getDefaultDays();
    const goal = d.goal || "gain";
    const location = d.location || "gym";

    try {
      const res = await fetch("/api/ai/workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days, goal, location }),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      const sorted = [...data.workout].sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));
      setWorkout(sorted);
      localStorage.setItem("fitnix_workout_plan", JSON.stringify(sorted));
      if (sorted.length > 0 && !activeDay) setActiveDay(sorted[0].day);
    } catch {
      const cached = localStorage.getItem("fitnix_workout_plan");
      if (cached) setWorkout(JSON.parse(cached));
      else setError("تعذر إنشاء الخطة.");
    } finally { setLoading(false); }
  }, [activeDay]);

  useEffect(() => {
    const cached = localStorage.getItem("fitnix_workout_plan");
    if (cached) {
      try {
        const p = JSON.parse(cached);
        setWorkout(p);
        if (p.length > 0) setActiveDay(p[0].day);
        setLoading(false);
      } catch { generatePlan(); }
    } else generatePlan();
  }, [generatePlan]);

  const goalLabel = userData.goal === "gain" ? "تضخيم" : userData.goal === "loss" ? "تنحيف" : "---";
  const locationLabel = userData.location === "gym" ? "نادي" : userData.location === "home" ? "منزل" : "---";

  const quickActions = [
    { label: "المدرب الذكي", desc: "اسأل AI", href: "/ai", icon: Bot, color: "from-fitnix to-fitnix-dark" },
    { label: "خطة التغذية", desc: "وجباتك", href: "/meal-plan", icon: UtensilsCrossed, color: "from-amber-500 to-orange-500" },
    { label: "ماسح الطعام", desc: "صورة + سعرات", href: "/food-scanner", icon: Camera, color: "from-orange-500 to-red-500" },
    { label: "تحليل الجسم", desc: "صورة + AI", href: "/body-analysis", icon: Scan, color: "from-purple-500 to-pink-500" },
  ];

  const totalExercises = workout.reduce((s, d) => s + d.exercises.length, 0);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-light-bg">
        <motion.div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-fitnix/10 to-fitnix/5" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <Dumbbell className="h-10 w-10 text-fitnix" />
        </motion.div>
        <motion.p className="mt-4 text-sm font-medium text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>جاري تجهيز مركز قيادتك...</motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-light-bg">
        <AlertCircle className="mb-4 h-12 w-12 text-red-400" />
        <p className="text-sm text-gray-500">{error}</p>
        <button onClick={generatePlan} className="mt-4 rounded-xl bg-fitnix px-6 py-3 text-sm font-bold text-white">إعادة المحاولة</button>
      </div>
    );
  }

  return (
    <div className="container-premium pt-24 pb-12">
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <motion.div
          className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border border-white/20" />
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full border border-white/10" />
          </div>
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <motion.p className="text-xs font-medium text-fitnix" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                Fitnix AI Command Center
              </motion.p>
              <motion.h1 className="mt-1 text-2xl font-black text-white sm:text-3xl" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                مرحباً، {userName || "البطل"} 👋
              </motion.h1>
              <motion.p className="mt-1 text-sm text-gray-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                خطة اليوم بانتظارك 💪
              </motion.p>
            </div>
            <div className="flex items-center gap-2">
              {goalLabel !== "---" && (
                <span className="rounded-xl bg-fitnix/10 px-3 py-1.5 text-xs font-bold text-fitnix backdrop-blur-sm">{goalLabel}</span>
              )}
              {locationLabel !== "---" && (
                <span className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">{locationLabel}</span>
              )}
              <Link href="/ai" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-fitnix to-fitnix-dark px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:shadow-xl">
                <Bot className="h-3.5 w-3.5" />
                اسأل AI
              </Link>
            </div>
          </div>

          {/* Quick Stats in Hero */}
          <motion.div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {[
              { label: "أيام التمرين", value: workout.length, icon: CalendarDays },
              { label: "التمارين", value: totalExercises, icon: Dumbbell },
              { label: "المجموعات", value: totalExercises * 4, icon: Activity },
              { label: "الخطة", value: goalLabel === "---" ? "جديد" : goalLabel, icon: Flame },
            ].map((s, i) => (
              <div key={s.label} className="rounded-xl bg-white/5 p-3 text-center backdrop-blur-sm">
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action, i) => (
            <Link key={action.label} href={action.href}>
              <motion.div
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-md transition-all group-hover:scale-110`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-bold text-gray-900">{action.label}</p>
                <p className="text-xs text-gray-400">{action.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Subscription Status */}
        {stats && (
          <motion.div
            className="mb-8 flex items-center gap-3 rounded-2xl border border-green-100 bg-green-50 p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-200/50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-green-800">اشتراك نشط</p>
              <p className="text-xs text-green-600"> {stats.activeSubscriptions} مشترك نشط على المنصة</p>
            </div>
            <Link href="/admin/knowledge" className="rounded-xl bg-green-200/50 px-4 py-2 text-xs font-bold text-green-700 transition-colors hover:bg-green-200">
              الإحصائيات
            </Link>
          </motion.div>
        )}

        {/* Weekly Workout Plan */}
        {workout.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <Dumbbell className="h-5 w-5 text-fitnix" />
                خطة التمرين الأسبوعية
              </h2>
              <motion.button
                onClick={generatePlan}
                className="flex items-center gap-2 rounded-xl bg-fitnix/5 px-4 py-2 text-xs font-bold text-fitnix transition-all hover:bg-fitnix/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                تجديد
              </motion.button>
            </div>
            <div className="grid gap-4">
              {workout.map((day) => (
                <WorkoutDayCard
                  key={day.day}
                  day={day.day}
                  focus={day.focus}
                  exercises={day.exercises}
                  isActive={activeDay === day.day}
                  onSelect={() => setActiveDay(day.day)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ApprovalGate>
      <DashboardContent />
    </ApprovalGate>
  );
}
