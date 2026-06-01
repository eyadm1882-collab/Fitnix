"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/onboarding/ProgressBar";
import Step1Registration from "@/components/onboarding/Step1Registration";
import Step2MyData from "@/components/onboarding/Step2MyData";
import Step3Preferences from "@/components/onboarding/Step3Preferences";
import Step4Plans from "@/components/onboarding/Step4Plans";
import Step5Payment from "@/components/onboarding/Step5Payment";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const router = useRouter();

  const handleNext = (data: any) => {
    const key = ["registration", "myData", "preferences", "plans", "payment"][step];
    const newData = { ...formData, [key]: data };
    setFormData(newData);

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
    else router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-bg p-4">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
          <ProgressBar currentStep={step} />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <Step1Registration
                key="step1"
                onNext={handleNext}
                data={formData.registration}
              />
            )}
            {step === 1 && (
              <Step2MyData
                key="step2"
                onNext={handleNext}
                onBack={handleBack}
                data={formData.myData}
              />
            )}
            {step === 2 && (
              <Step3Preferences
                key="step3"
                onNext={handleNext}
                onBack={handleBack}
                data={formData.preferences}
              />
            )}
            {step === 3 && (
              <Step4Plans
                key="step4"
                onNext={handleNext}
                onBack={handleBack}
                data={formData.plans}
              />
            )}
            {step === 4 && (
              <Step5Payment
                key="step5"
                data={formData}
                onBack={handleBack}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
