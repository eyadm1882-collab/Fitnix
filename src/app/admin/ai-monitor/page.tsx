"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, MessageSquare, FileText, Loader2 } from "lucide-react";

export default function AdminAIMonitorPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-fitnix" /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-cyan-50">
          <Bot className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">مراقبة AI</h1>
          <p className="text-sm text-gray-500">إحصائيات المساعد الذكي</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "رسائل AI", value: stats?.messagesCount || 0, icon: MessageSquare, color: "from-fitnix to-fitnix-dark" },
          { label: "مستندات المعرفة", value: stats?.documentsCount || 0, icon: FileText, color: "from-blue-500 to-cyan-500" },
          { label: "محادثات نشطة", value: "—", icon: Bot, color: "from-purple-500 to-pink-500" },
        ].map((card) => (
          <motion.div key={card.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm" whileHover={{ y: -2 }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="mt-1 text-3xl font-black text-gray-900">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
