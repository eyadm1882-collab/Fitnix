"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Mail, Lock, User, Calendar } from "lucide-react";
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
      if (signUpError.message.includes("already registered")) {
        setError("البريد الإلكتروني مسجل بالفعل");
      } else {
        setError("حدث خطأ. حاول مرة أخرى");
      }
      setLoading(false);
    } else {
      onNext(form);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-sm font-medium text-red-600">{error}</div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-700">البريد الإلكتروني</label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            dir="ltr"
            className="input pr-10"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-700">كلمة المرور</label>
        <div className="relative">
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
            className="input pr-10"
            placeholder="••••••••"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-700">الاسم الكامل</label>
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
            className="input pr-10"
            placeholder="محمد أحمد"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-700">تاريخ الميلاد</label>
        <div className="relative">
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="date"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
            required
            className="input pr-10"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-700">الجنس</label>
        <div className="flex gap-3">
          {["ذكر", "أنثى"].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setForm({ ...form, gender: g })}
              className={`flex-1 rounded-xl border-2 py-3 text-sm font-bold transition-all ${
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

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3.5"
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "التالي"}
      </button>
    </motion.form>
  );
}
