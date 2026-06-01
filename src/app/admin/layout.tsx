"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  BookOpen,
  Bot,
  CreditCard,
  Activity,
  ChevronLeft,
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/users", label: "المستخدمون", icon: Users },
  { href: "/admin/subscriptions", label: "الاشتراكات", icon: CreditCard },
  { href: "/admin/exercises", label: "التمارين", icon: Dumbbell },
  { href: "/admin/knowledge", label: "المعرفة", icon: BookOpen },
  { href: "/admin/ai-monitor", label: "مراقبة AI", icon: Activity },
  { href: "/ai", label: "المساعد الذكي", icon: Bot },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      {/* Top Bar */}
      <nav className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-xl">
        <Link href="/discover" className="text-xl font-black text-fitnix">
          Fitnix <span className="text-xs font-normal text-gray-400">Admin</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/discover"
            className="flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-gray-600"
          >
            <ChevronLeft className="h-3 w-3" />
            العودة للموقع
          </Link>
        </div>
      </nav>

      {/* Sidebar + Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed bottom-0 right-0 top-16 hidden w-64 border-l border-gray-100 bg-white lg:block">
          <div className="space-y-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-fitnix/10 to-fitnix/5 text-fitnix"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Mobile Nav */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white lg:hidden">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`flex flex-col items-center gap-1 px-3 py-1 ${
                    isActive ? "text-fitnix" : "text-gray-400"
                  }`}>
                    <item.icon className="h-5 w-5" />
                    <span className="text-[10px]">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[calc(100vh-64px)] w-full lg:mr-64">
          <div className="p-6 pb-24 lg:pb-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
