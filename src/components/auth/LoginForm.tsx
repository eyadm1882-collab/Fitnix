"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        : "حدث خطأ. حاول مرة أخرى");
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <motion.form
      onSubmit={handleLogin}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {error && (
        <motion.div
          className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          {error}
        </motion.div>
      )}

      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          dir="ltr"
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-right text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-gray-700">كلمة المرور</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-right text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3.5 text-base font-bold text-white shadow-lg shadow-fitnix/25 transition-all hover:shadow-xl disabled:opacity-50"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {loading ? (
          <Loader2 className="mx-auto h-5 w-5 animate-spin" />
        ) : (
          "تسجيل الدخول"
        )}
      </motion.button>
    </motion.form>
  );
}
