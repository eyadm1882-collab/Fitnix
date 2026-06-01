import AIChat from "@/components/ai/AIChat";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function AIPage() {
  return (
    <div className="min-h-screen bg-light-bg">
      <div className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div />
          <Link
            href="/admin/knowledge"
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-medium text-gray-500 shadow-sm ring-1 ring-gray-100 transition-colors hover:bg-fitnix/5 hover:text-fitnix"
          >
            <BookOpen className="h-3.5 w-3.5" />
            إدارة المعرفة
          </Link>
        </div>
        <AIChat fullPage />
      </div>
    </div>
  );
}
