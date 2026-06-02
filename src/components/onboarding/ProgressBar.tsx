"use client";

import { motion } from "framer-motion";

const steps = [
  { key: "register", label: "التسجيل" },
  { key: "data", label: "بياناتي" },
  { key: "preferences", label: "اختياراتي" },
  { key: "plans", label: "الباقات" },
  { key: "payment", label: "الدفع" },
];

interface ProgressBarProps {
  currentStep: number;
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="relative mb-3 flex justify-between">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={step.key} className="flex flex-col items-center">
              <motion.div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all sm:h-9 sm:w-9 ${
                  isCompleted || isCurrent
                    ? "bg-fitnix text-white shadow-sm"
                    : "bg-gray-100 text-gray-400"
                }`}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {isCompleted ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </motion.div>
              <span className={`mt-1.5 text-[10px] font-medium ${
                isCurrent ? "text-fitnix font-bold" : isCompleted ? "text-fitnix" : "text-gray-400"
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="relative h-1.5 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-fitnix"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
