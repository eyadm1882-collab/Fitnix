import PendingUsers from "@/components/admin/PendingUsers";
import { Users } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/10">
          <Users className="h-5 w-5 text-fitnix" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900">إدارة المستخدمين</h1>
          <p className="text-sm text-gray-500">الموافقة على طلبات التسجيل الجديدة</p>
        </div>
      </div>
      <PendingUsers />
    </div>
  );
}
