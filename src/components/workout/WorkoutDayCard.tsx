"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Dumbbell, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";

interface Exercise {
  name: string;
  muscleGroup?: string;
  sets: string | number;
  reps: string;
}

interface WorkoutDayCardProps {
  day: string;
  focus: string;
  exercises: Exercise[];
  isActive: boolean;
  onSelect: () => void;
}

export default function WorkoutDayCard({ day, focus, exercises, isActive, onSelect }: WorkoutDayCardProps) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleExercise = (name: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const progress = exercises.length > 0 ? completed.size / exercises.length : 0;
  const isComplete = progress === 1;

  return (
    <motion.div
      layout
      className={`cursor-pointer rounded-xl border transition-all ${
        isActive
          ? "border-fitnix bg-white shadow-md"
          : "border-gray-100 bg-white/80 hover:border-gray-200 hover:shadow-sm"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-base font-black transition-all ${
              isComplete
                ? "bg-fitnix text-white"
                : isActive
                ? "bg-fitnix/10 text-fitnix"
                : "bg-gray-50 text-gray-400"
            }`}
          >
            {isComplete ? <Check className="h-5 w-5" /> : day.slice(0, 1)}
          </div>
          <div>
            <h3 className={`text-sm font-bold ${isActive ? "text-gray-900" : "text-gray-600"}`}>{day}</h3>
            <p className="text-xs text-gray-400">{focus}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 rounded-full bg-gray-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-fitnix"
              initial={{ width: "0%" }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <span className="text-xs text-gray-400 w-8 text-left">{completed.size}/{exercises.length}</span>
          {isActive ? <ChevronUp className="h-4 w-4 text-fitnix" /> : <ChevronDown className="h-4 w-4 text-gray-300" />}
        </div>
      </div>

      {isActive && (
        <motion.div
          className="space-y-1 px-4 pb-4"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {exercises.map((ex, i) => {
            const done = completed.has(ex.name);
            return (
              <motion.div
                key={ex.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={(e) => { e.stopPropagation(); toggleExercise(ex.name); }}
                className={`flex items-center gap-3 rounded-xl p-3 transition-all ${
                  done ? "bg-fitnix/5" : "hover:bg-gray-50"
                }`}
              >
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                  done ? "border-fitnix bg-fitnix text-white" : "border-gray-200 text-transparent"
                }`}>
                  {done && <Check className="h-3.5 w-3.5" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                    {ex.name}
                  </p>
                  <p className="text-xs text-gray-400">{ex.muscleGroup || "عام"}</p>
                </div>
                <div className="text-left">
                  <p className={`text-xs font-bold ${done ? "text-gray-300" : "text-gray-600"}`}>
                    {String(ex.sets)}×{ex.reps}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {completed.size > 0 && (
            <motion.button
              onClick={(e) => { e.stopPropagation(); setCompleted(new Set()); }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 py-2.5 text-xs font-medium text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              whileHover={{ scale: 1.01 }}
            >
              <RotateCcw className="h-3 w-3" />
              إعادة تعيين
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
