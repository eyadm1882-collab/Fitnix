"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";

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
      if (error.message === "Invalid login credentials") {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      } else {
        setError("حدث خطأ. حاول مرة أخرى");
      }
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-bold text-gray-700">البريد الإلكتروني</label>
        <div className="relative">
          <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
        {loading ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : "تسجيل الدخول"}
      </button>
    </motion.form>
  );
}
