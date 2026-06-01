"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, XCircle, Clock, Loader2 } from "lucide-react";

interface Sub {
  id: string;
  userEmail: string;
  plan: string;
  status: string;
  date: string;
}

export default function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("fitnix_pending_users") || "[]");
    const mapped = stored
      .filter((u: any) => u.status !== "pending")
      .map((u: any) => ({
        id: u.id,
        userEmail: u.email,
        plan: u.plan_type || "شهري",
        status: u.status === "approved" ? "نشط" : "ملغي",
        date: new Date(u.requested_at).toLocaleDateString("ar-SA"),
      }));
    setSubs(mapped);
    setLoading(false);
  }, []);

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-fitnix" /></div>;

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50">
          <CreditCard className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">إدارة الاشتراكات</h1>
          <p className="text-sm text-gray-500">جميع الاشتراكات النشطة والملغية</p>
        </div>
      </div>

      {subs.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <CreditCard className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm text-gray-500">لا توجد اشتراكات بعد</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <table className="w-full text-right">
            <thead className="border-b border-gray-50 bg-gray-50/50">
              <tr>
                <th className="px-5 py-3 text-xs font-bold text-gray-500">المستخدم</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500">الباقة</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500">الحالة</th>
                <th className="px-5 py-3 text-xs font-bold text-gray-500">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subs.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4 text-sm text-gray-900">{s.userEmail}</td>
                  <td className="px-5 py-4 text-sm text-gray-700">{s.plan}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold ${
                      s.status === "نشط" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                    }`}>
                      {s.status === "نشط" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {s.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
