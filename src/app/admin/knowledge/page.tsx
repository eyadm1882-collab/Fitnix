import KnowledgeUpload from "@/components/admin/KnowledgeUpload";
import KnowledgeList from "@/components/admin/KnowledgeList";
import { Database, BookOpen } from "lucide-react";

export default function KnowledgePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5">
            <Database className="h-6 w-6 text-fitnix" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">إدارة قاعدة المعرفة</h1>
            <p className="text-sm text-gray-500">ارفع المستندات والملفات لتعزيز معرفة Fitnix AI</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <KnowledgeUpload />
        <div>
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-fitnix" />
            <h3 className="text-lg font-bold text-gray-900">المستندات المرفوعة</h3>
          </div>
          <KnowledgeList />
        </div>
      </div>
    </div>
  );
}
