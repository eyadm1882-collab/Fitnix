import StatsCards from "@/components/admin/StatsCards";
import { LayoutDashboard } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/10">
          <LayoutDashboard className="h-5 w-5 text-fitnix" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900">لوحة التحكم</h1>
          <p className="text-sm text-gray-500">نظرة عامة على المنصة</p>
        </div>
      </div>
      <StatsCards />
    </div>
  );
}
