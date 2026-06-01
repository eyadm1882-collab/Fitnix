"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, XCircle, LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type ApprovalStatus = "pending" | "approved" | "rejected" | "loading";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  requested_at: string;
}

export default function ApprovalGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<ApprovalStatus>("loading");
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("fitnix_user_email");
    const name = localStorage.getItem("fitnix_user_name");
    setUserName(name || "");

    if (!userEmail && !name) {
      setStatus("approved");
      return;
    }

    const pending = JSON.parse(localStorage.getItem("fitnix_pending_users") || "[]");
    const currentUser = pending.find((u: PendingUser) => u.email === userEmail);

    if (currentUser) {
      setStatus(currentUser.status as ApprovalStatus);
    } else {
      setStatus("approved");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fitnix_user_name");
    localStorage.removeItem("fitnix_user_email");
    localStorage.removeItem("fitnix_workout_data");
    localStorage.removeItem("fitnix_workout_plan");
    router.push("/discover");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-light-bg">
        <Loader2 className="h-8 w-8 animate-spin text-fitnix" />
      </div>
    );
  }

  if (status === "approved") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-bg p-4" dir="rtl">
      <motion.div
        className="w-full max-w-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Pending Screen */}
        {status === "pending" && (
          <>
            <motion.div
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-100 to-amber-50 shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className="h-12 w-12 text-amber-500" />
            </motion.div>

            <h1 className="mb-2 text-2xl font-black text-gray-900">
              مرحباً {userName}!
            </h1>
            <p className="mb-1 text-sm text-gray-500">
              تم استلام طلبك بنجاح ✅
            </p>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              طلبك قيد المراجعة من قبل فريق Fitnix.
              <br />
              سنقوم بتفعيل حسابك خلال 24 ساعة كحد أقصى.
            </p>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-200/50">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-800">قيد المراجعة</p>
                  <p className="text-xs text-amber-600">سيتم إشعارك عند التفعيل</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleLogout}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 py-3.5 text-sm font-bold text-gray-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <LogOut className="h-4 w-4" />
              تسجيل خروج
            </motion.button>
          </>
        )}

        {/* Rejected Screen */}
        {status === "rejected" && (
          <>
            <motion.div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-red-100 to-red-50 shadow-lg">
              <XCircle className="h-12 w-12 text-red-500" />
            </motion.div>

            <h1 className="mb-2 text-2xl font-black text-gray-900">عذراً</h1>
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              لم يتم الموافقة على طلبك. للاستفسار، تواصل مع الدعم الفني.
            </p>

            <motion.button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3.5 text-sm font-bold text-white shadow-lg"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <LogOut className="h-4 w-4" />
              العودة للرئيسية
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}
