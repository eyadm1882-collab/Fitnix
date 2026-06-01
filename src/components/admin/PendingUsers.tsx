"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle2, XCircle, Loader2, Mail, User, Clock } from "lucide-react";

interface PendingUser {
  id: string;
  email: string;
  name: string | null;
  status: "pending" | "approved" | "rejected";
  requested_at: string;
}

export default function PendingUsers() {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const stored = JSON.parse(localStorage.getItem("fitnix_pending_users") || "[]");
    setUsers(stored.filter((u: PendingUser) => u.status === "pending"));
    setLoading(false);
  };

  const handleAction = (id: string, action: "approve" | "reject") => {
    setProcessing(id);

    const stored = JSON.parse(localStorage.getItem("fitnix_pending_users") || "[]");
    const updated = stored.map((u: PendingUser) =>
      u.id === id ? { ...u, status: action === "approve" ? "approved" : "rejected" } : u
    );
    localStorage.setItem("fitnix_pending_users", JSON.stringify(updated));
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setProcessing(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-fitnix" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <Users className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <p className="text-sm text-gray-500">لا يوجد مستخدمون في قائمة الانتظار</p>
        <p className="text-xs text-gray-400">جميع الطلبات تم معالجتها</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user, i) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
                <User className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name || "بدون اسم"}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Mail className="h-3 w-3" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {new Date(user.requested_at).toLocaleDateString("ar-SA")}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => handleAction(user.id, "approve")}
                disabled={processing === user.id}
                className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-fitnix to-fitnix-dark px-4 py-2 text-xs font-bold text-white shadow-sm transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {processing === user.id ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-3 w-3" />
                )}
                قبول
              </motion.button>
              <motion.button
                onClick={() => handleAction(user.id, "reject")}
                disabled={processing === user.id}
                className="flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-500 transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <XCircle className="h-3 w-3" />
                رفض
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
