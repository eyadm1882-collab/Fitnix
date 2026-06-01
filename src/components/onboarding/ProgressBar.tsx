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
    <div className="mb-10">
      <div className="relative mb-4 flex justify-between">
        {steps.map((step, i) => (
          <div key={step.key} className="flex flex-col items-center">
            <motion.div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all sm:h-10 sm:w-10 ${
                i <= currentStep
                  ? "bg-gradient-to-r from-fitnix to-fitnix-dark text-white shadow-md shadow-fitnix/20"
                  : "bg-gray-100 text-gray-400"
              }`}
              initial={false}
              animate={{
                scale: i === currentStep ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {i + 1}
            </motion.div>
            <span
              className={`mt-1.5 text-[10px] font-medium sm:text-xs ${
                i <= currentStep ? "text-fitnix" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative h-1.5 overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-fitnix to-fitnix-dark"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
