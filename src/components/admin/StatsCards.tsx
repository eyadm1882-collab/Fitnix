"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, Clock, BookOpen, MessageSquare, UserCheck } from "lucide-react";

interface Stats {
  usersCount: number;
  subscriptionsCount: number;
  pendingCount: number;
  activeSubscriptions: number;
  documentsCount: number;
  messagesCount: number;
}

const cards = [
  { key: "usersCount", label: "إجمالي المستخدمين", icon: Users, color: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
  { key: "activeSubscriptions", label: "اشتراكات نشطة", icon: UserCheck, color: "from-fitnix to-fitnix-dark", bg: "bg-green-50" },
  { key: "pendingCount", label: "طلبات انتظار", icon: Clock, color: "from-amber-500 to-amber-600", bg: "bg-amber-50" },
  { key: "subscriptionsCount", label: "إجمالي الاشتراكات", icon: CreditCard, color: "from-purple-500 to-purple-600", bg: "bg-purple-50" },
  { key: "documentsCount", label: "مستندات المعرفة", icon: BookOpen, color: "from-sky-500 to-sky-600", bg: "bg-sky-50" },
  { key: "messagesCount", label: "رسائل AI", icon: MessageSquare, color: "from-rose-500 to-rose-600", bg: "bg-rose-50" },
];

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`rounded-2xl border border-gray-100 ${card.bg} p-5 shadow-sm`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <motion.p
                className="mt-1 text-3xl font-black text-gray-900"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: i * 0.08 + 0.2 }}
              >
                {stats ? (stats as any)[card.key] ?? 0 : "-"}
              </motion.p>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-lg`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
