"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, ArrowLeft, Home, CreditCard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface StepProps {
  data: any;
  onBack: () => void;
}

const GUMROAD_MONTHLY = "https://gumroad.com/checkout?_gl=11dgrpmv_gaMTg5MzcwMzAzNi4xNzcyNTM3NDc4_ga_6LJN6D94N6*czE3Nzk5ODAxMTYkbzI4JGcwJHQxNzc5OTgwMTE2JGo2MCRsMCRoMA..";
const GUMROAD_QUARTERLY = "https://gumroad.com/checkout?_gl=11c1bb6o_gaMTg5MzcwMzAzNi4xNzcyNTM3NDc4_ga_6LJN6D94N6*czE3Nzk5ODAxMTYkbzI4JGcxJHQxNzc5OTgwODQ2JGozMCRsMCRoMA..";

export default function Step5Payment({ data, onBack }: StepProps) {
  const [loading, setLoading] = useState(false);
  const [showPostPayment, setShowPostPayment] = useState(false);
  const router = useRouter();

  const userData = data?.registration || {};
  const plan = data?.plans?.plan;
  const planPrice = plan === "monthly" ? "35" : "100";
  const planName = plan === "monthly" ? "شهري" : "٣ شهور";
  const gumroadUrl = plan === "monthly" ? GUMROAD_MONTHLY : GUMROAD_QUARTERLY;

  const handleContinueToPayment = () => {
    setLoading(true);

    const myData = data?.myData || {};
    const preferences = data?.preferences || {};
    const fullName = userData.fullName || "";
    const email = userData.email || "";

    localStorage.setItem("fitnix_user_name", fullName);
    localStorage.setItem("fitnix_user_email", email);
    localStorage.setItem("fitnix_approval_status", "pending");
    localStorage.setItem("fitnix_workout_data", JSON.stringify({
      goal: myData.goal || "gain",
      location: myData.location || "gym",
      days: preferences.days || [],
    }));

    const pending = JSON.parse(localStorage.getItem("fitnix_pending_users") || "[]");
    if (!pending.find((u: any) => u.email === email)) {
      pending.unshift({
        id: crypto.randomUUID(),
        name: fullName,
        email,
        status: "pending",
        requested_at: new Date().toISOString(),
      });
      localStorage.setItem("fitnix_pending_users", JSON.stringify(pending));
    }

    setTimeout(() => {
      setLoading(false);
      window.open(gumroadUrl, "_blank");
      setShowPostPayment(true);
    }, 1500);
  };

  return (
    <>
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
      >
        <div className="text-center">
          <CreditCard className="mx-auto mb-2 h-8 w-8 text-fitnix" />
          <h2 className="text-2xl font-black text-gray-900">الدفع</h2>
          <p className="mt-1 text-sm text-gray-500">بريمية بطاقة دفع آمنة</p>
        </div>

        {/* Premium Card */}
        <motion.div
          className="relative mx-auto aspect-[1.586/1] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-fitnix to-emerald-700 p-6 shadow-xl"
          initial={{ scale: 0.95, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[3px] border-white" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full border-[3px] border-white" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-start justify-between">
              <Image src="/header.tsx/middle.png" alt="Fitnix" width={36} height={36} className="h-7 w-7 rounded-lg bg-white/20 p-1" />
              <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[10px] font-bold text-white">Mada</span>
            </div>
            <div className="text-white">
              <p className="mb-1 text-sm font-medium text-white/70">{userData.fullName || "اسم المستخدم"}</p>
              <p className="text-lg font-bold">{planName}</p>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-white">
                <span className="text-2xl font-black">{planPrice}</span>
                <span className="mr-1 text-sm text-white/70">ريال</span>
              </div>
              <span className="text-lg font-bold tracking-wider text-white/50" style={{ fontFamily: "serif" }}>VISA</span>
            </div>
          </div>
          <div className="absolute bottom-16 right-6 h-8 w-12 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500/60" />
        </motion.div>

        {/* Summary */}
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">الباقة</span>
            <span className="font-bold text-gray-900">{planName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">السعر</span>
            <span className="font-bold text-gray-900">{planPrice} ريال</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-sm">
            <span className="text-gray-500">الإجمالي</span>
            <span className="text-lg font-black text-fitnix">{planPrice} ريال</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onBack} className="btn-secondary flex-1 py-3.5">السابق</button>
          <motion.button
            onClick={handleContinueToPayment}
            disabled={loading}
            className="btn-primary flex-1 py-3.5"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? (
              <Loader2 className="mx-auto h-5 w-5 animate-spin" />
            ) : (
              `متابعة للدفع — ${planPrice} ريال`
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Post-Payment Modal */}
      <AnimatePresence>
        {showPostPayment && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-2xl"
              initial={{ scale: 0.9, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 24 }}
            >
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-fitnix to-fitnix-dark shadow-lg">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-white">تم استلام طلبك!</h2>
                <p className="mb-1 text-sm text-white/70">يتم الآن تجهيز جدولك وخطتك</p>
                <p className="mb-6 text-xs text-white/50">عد خلال نصف يوم إلى يوم كامل</p>
                <div className="space-y-3">
                  <a href="/dashboard" className="btn-primary w-full py-3.5 block text-center">
                    متابعة
                  </a>
                  <a href="/auth/login" className="btn-secondary w-full py-3.5 block text-center border-white/20 text-white hover:bg-white/5">
                    <div className="flex items-center justify-center gap-2">
                      <Home className="h-4 w-4" />
                      تسجيل الدخول
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
