"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function KnowledgeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) validateAndSet(f);
  };

  const validateAndSet = (f: File) => {
    const allowed = ["text/plain", "text/markdown", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(f.type)) {
      setResult({ success: false, message: "نوع الملف غير مدعوم. استخدم PDF, TXT, DOCX, أو Markdown." });
      return;
    }
    setFile(f);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/ai/knowledge", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setResult({ success: true, message: `تم رفع "${file.name}" بنجاح (${data.chunksCount} مقطع)` });
        setFile(null);
      } else {
        setResult({ success: false, message: data.error || "فشل الرفع" });
      }
    } catch {
      setResult({ success: false, message: "حدث خطأ في الاتصال" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-gray-900">رفع معرفة جديدة</h3>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center transition-colors hover:border-fitnix/40"
      >
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-fitnix" />
            <div className="text-right">
              <p className="font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              className="mr-2 rounded-full p-1 text-gray-400 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-500">اسحب وأفلت الملف هنا أو اضغط للاختيار</p>
            <p className="mt-1 text-xs text-gray-400">PDF, TXT, DOCX, Markdown</p>
          </>
        )}
        <input ref={inputRef} type="file" accept=".pdf,.txt,.docx,.md" className="hidden" onChange={(e) => e.target.files?.[0] && validateAndSet(e.target.files[0])} />
      </div>

      {file && (
        <motion.button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fitnix to-fitnix-dark py-3 text-sm font-bold text-white shadow-lg transition-all disabled:opacity-50"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "جاري الرفع..." : "رفع الملف"}
        </motion.button>
      )}

      {result && (
        <motion.div
          className={`mt-4 flex items-center gap-2 rounded-xl p-3 text-sm ${
            result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
          }`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {result.success ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}
          {result.message}
        </motion.div>
      )}
    </div>
  );
}
