import AIChat from "@/components/ai/AIChat";
import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";

export default function AIPage() {
  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <div className="container-premium pt-24 pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5 shadow-lg shadow-fitnix/10">
                <Sparkles className="h-7 w-7 text-fitnix" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">المساعد الذكي</h1>
                <p className="mt-1 text-sm text-gray-500">مدرب Fitnix AI — اسأل عن أي شيء</p>
              </div>
            </div>
            <Link
              href="/admin/knowledge"
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-medium text-gray-500 shadow-sm ring-1 ring-gray-100 transition-colors hover:bg-fitnix/5 hover:text-fitnix"
            >
              <BookOpen className="h-3.5 w-3.5" />
              إدارة المعرفة
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-gray-200/50">
            <AIChat fullPage />
          </div>
        </div>
      </div>
    </div>
  );
}
