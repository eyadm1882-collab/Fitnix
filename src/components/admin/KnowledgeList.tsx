"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Trash2, Loader2, Search } from "lucide-react";

interface Document {
  id: string;
  title: string;
  file_type: string;
  created_at: string;
}

const fileTypeLabel: Record<string, string> = {
  "text/plain": "TXT",
  "text/markdown": "MD",
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
};

export default function KnowledgeList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/ai/knowledge");
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      console.error("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/knowledge/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      }
    } catch {
      console.error("Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = documents.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-fitnix" />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
        <FileText className="mx-auto mb-3 h-10 w-10 text-gray-300" />
        <p className="text-sm text-gray-500">لا توجد مستندات معرفة بعد</p>
        <p className="text-xs text-gray-400">ارفع ملفاً لبدء بناء قاعدة المعرفة</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="بحث في المستندات..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-11 pl-4 text-sm text-gray-900 outline-none transition-all focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
          dir="rtl"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/5">
                <FileText className="h-5 w-5 text-fitnix" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                <p className="text-xs text-gray-400">
                  {fileTypeLabel[doc.file_type] || "ملف"} · {new Date(doc.created_at).toLocaleDateString("ar-SA")}
                </p>
              </div>
            </div>
            <motion.button
              onClick={() => handleDelete(doc.id)}
              disabled={deleting === doc.id}
              className="rounded-xl p-2 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {deleting === doc.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && searchQuery && (
        <p className="mt-4 text-center text-sm text-gray-400">لا توجد نتائج للبحث</p>
      )}
    </div>
  );
}
