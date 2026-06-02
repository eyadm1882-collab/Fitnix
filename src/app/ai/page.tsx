import AIChat from "@/components/ai/AIChat";
import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";

export default function AIPage() {
  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <div className="container-premium pt-20 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5 shadow-sm">
                <Sparkles className="h-6 w-6 text-fitnix" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">المساعد الذكي</h1>
                <p className="text-sm text-gray-500">مدرب Fitnix AI — اسأل عن أي شيء</p>
              </div>
            </div>
            <Link
              href="/admin/knowledge"
              className="btn-ghost btn-sm"
            >
              <BookOpen className="h-3.5 w-3.5" />
              إدارة المعرفة
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <AIChat fullPage />
          </div>
        </div>
      </div>
    </div>
  );
}
