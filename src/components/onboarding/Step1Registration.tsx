"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface StepProps {
  onNext: (data: any) => void;
  data: any;
}

export default function Step1Registration({ onNext, data }: StepProps) {
  const [form, setForm] = useState({
    email: data?.email || "",
    password: "",
    fullName: data?.fullName || "",
    birthDate: data?.birthDate || "",
    gender: data?.gender || "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.gender) { setError("يرجى اختيار الجنس"); return; }
    setLoading(true);
    setError("");

    const { error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { full_name: form.fullName } },
    });

    if (signUpError) {
      setError(signUpError.message === "User already registered"
        ? "البريد الإلكتروني مسجل بالفعل"
        : "حدث خطأ. حاول مرة أخرى");
      setLoading(false);
    } else {
      onNext(form);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {error && (
        <div className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">{error}</div>
      )}

      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">البريد الإلكتروني</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          dir="ltr"
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-right text-gray-900 outline-none transition-all focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">كلمة المرور</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-right text-gray-900 outline-none transition-all focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
            placeholder="••••••••"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">الاسم الكامل</label>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-right text-gray-900 outline-none transition-all focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
          placeholder="محمد أحمد"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">تاريخ الميلاد</label>
        <input
          type="date"
          value={form.birthDate}
          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          required
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-right text-gray-900 outline-none transition-all focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">الجنس</label>
        <div className="flex gap-3">
          {["ذكر", "أنثى"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setForm({ ...form, gender: g })}
              className={`flex-1 rounded-2xl border-2 py-3.5 text-sm font-bold transition-all ${
                form.gender === g
                  ? "border-fitnix bg-fitnix/10 text-fitnix"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3.5 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : "التالي"}
      </motion.button>
    </motion.form>
  );
}
