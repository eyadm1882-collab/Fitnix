import StatsCards from "@/components/admin/StatsCards";
import { LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5">
            <LayoutDashboard className="h-6 w-6 text-fitnix" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">لوحة التحكم</h1>
            <p className="text-sm text-gray-500">نظرة عامة على المنصة</p>
          </div>
        </div>
      </div>
      <StatsCards />
    </div>
  );
}
