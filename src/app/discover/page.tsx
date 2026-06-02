"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Sparkles, Home } from "lucide-react";
import Header from "@/components/Header";
import MarketingPage from "@/components/discover/MarketingPage";
import ExerciseLibrary from "@/components/discover/ExerciseLibrary";

type Tab = "marketing" | "exercises";

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState<Tab>("marketing");

  return (
    <div className="min-h-screen bg-light-bg">
      <Header simplified />
      <div className="relative pt-20">
        <AnimatePresence mode="wait">
          {activeTab === "marketing" ? (
            <motion.div
              key="marketing"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <MarketingPage />
            </motion.div>
          ) : (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ExerciseLibrary />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200/80 bg-white/90 backdrop-blur-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex max-w-lg items-center justify-around px-6 py-2">
          <button
            onClick={() => setActiveTab("marketing")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "marketing"
                ? "text-fitnix"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div
              className={`rounded-xl p-2 transition-all ${
                activeTab === "marketing"
                  ? "bg-fitnix/10"
                  : ""
              }`}
            >
              <Home
                size={22}
                className={activeTab === "marketing" ? "text-fitnix" : ""}
              />
            </div>
            <span
              className={`text-[10px] font-medium ${
                activeTab === "marketing" ? "text-fitnix" : "text-gray-400"
              }`}
            >
              الصفحة الرئيسية
            </span>
          </button>

          <button
            onClick={() => setActiveTab("exercises")}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === "exercises"
                ? "text-fitnix"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <div
              className={`rounded-xl p-2 transition-all ${
                activeTab === "exercises"
                  ? "bg-fitnix/10"
                  : ""
              }`}
            >
              <Dumbbell
                size={22}
                className={activeTab === "exercises" ? "text-fitnix" : ""}
              />
            </div>
            <span
              className={`text-[10px] font-medium ${
                activeTab === "exercises" ? "text-fitnix" : "text-gray-400"
              }`}
            >
              مكتبة التمارين
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
