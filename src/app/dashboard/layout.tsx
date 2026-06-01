import DashboardNav from "@/components/workout/DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <DashboardNav />
      {children}
    </div>
  );
}
