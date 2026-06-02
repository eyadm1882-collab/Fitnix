import KnowledgeUpload from "@/components/admin/KnowledgeUpload";
import KnowledgeList from "@/components/admin/KnowledgeList";
import { Database, BookOpen } from "lucide-react";

export default function KnowledgePage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/10">
          <Database className="h-5 w-5 text-fitnix" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900">إدارة قاعدة المعرفة</h1>
          <p className="text-sm text-gray-500">ارفع المستندات والملفات لتعزيز معرفة Fitnix AI</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <KnowledgeUpload />
        <div>
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-fitnix" />
            <h3 className="text-lg font-bold text-gray-900">المستندات المرفوعة</h3>
          </div>
          <KnowledgeList />
        </div>
      </div>
    </div>
  );
}
