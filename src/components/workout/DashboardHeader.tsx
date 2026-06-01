"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw, Bot, Loader2 } from "lucide-react";
import Link from "next/link";

interface WorkoutData {
  days: string[];
  goal: string;
  location: string;
}

export default function DashboardHeader({ onRegenerate }: { onRegenerate: () => void }) {
  const [userName, setUserName] = useState("");
  const [data, setData] = useState<WorkoutData | null>(null);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("fitnix_workout_data");
    const name = localStorage.getItem("fitnix_user_name");
    if (saved) setData(JSON.parse(saved));
    if (name) setUserName(name);
  }, []);

  const handleRegenerate = () => {
    setRegenerating(true);
    onRegenerate();
    setTimeout(() => setRegenerating(false), 2000);
  };

  const goalLabel = data?.goal === "gain" ? "تضخيم" : data?.goal === "loss" ? "تنحيف" : "";
  const locationLabel = data?.location === "gym" ? "نادي" : "منزل";

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            مرحباً {userName || "البطل"} 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            خطة التمرين لهذا الأسبوع
          </p>
        </div>
        <div className="flex items-center gap-2">
          {data && (
            <div className="hidden gap-2 sm:flex">
              <span className="rounded-xl bg-fitnix/5 px-3 py-1.5 text-xs font-medium text-fitnix">
                {goalLabel}
              </span>
              <span className="rounded-xl bg-fitnix/5 px-3 py-1.5 text-xs font-medium text-fitnix">
                {locationLabel}
              </span>
            </div>
          )}
          <motion.button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="flex items-center gap-2 rounded-xl bg-fitnix/5 px-4 py-2.5 text-xs font-bold text-fitnix transition-all hover:bg-fitnix/10 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {regenerating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            تجديد الخطة
          </motion.button>
          <Link
            href="/ai"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-fitnix to-fitnix-dark px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:shadow-xl"
          >
            <Bot className="h-3.5 w-3.5" />
            اسأل AI
          </Link>
        </div>
      </div>

      {data && (
        <div className="mt-4 flex gap-2 sm:hidden">
          <span className="rounded-xl bg-fitnix/5 px-3 py-1.5 text-xs font-medium text-fitnix">
            {goalLabel}
          </span>
          <span className="rounded-xl bg-fitnix/5 px-3 py-1.5 text-xs font-medium text-fitnix">
            {locationLabel}
          </span>
        </div>
      )}
    </div>
  );
}
