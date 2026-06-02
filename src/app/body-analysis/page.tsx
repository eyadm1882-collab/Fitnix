import { Scan, Sparkles } from "lucide-react";
import BodyAnalysis from "@/components/body/BodyAnalysis";

export default function BodyAnalysisPage() {
  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <div className="container-premium pt-20 pb-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 shadow-sm">
              <Scan className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">تحليل الجسم بالذكاء الاصطناعي</h1>
              <p className="flex items-center gap-1.5 text-sm text-gray-500">
                <Sparkles className="h-3.5 w-3.5 text-fitnix" />
                صور جسمك وحللها مع AI لتحصل على تقرير مفصل
              </p>
            </div>
          </div>
          <BodyAnalysis />
        </div>
      </div>
    </div>
  );
}
