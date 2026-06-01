import { Scan } from "lucide-react";
import BodyAnalysis from "@/components/body/BodyAnalysis";

export default function BodyAnalysisPage() {
  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <div className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50">
              <Scan className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">تحليل الجسم بالذكاء الاصطناعي</h1>
              <p className="text-sm text-gray-500">صور جسمك وحللها مع AI لتحصل على تقرير مفصل</p>
            </div>
          </div>
        </div>
        <BodyAnalysis />
      </div>
    </div>
  );
}
