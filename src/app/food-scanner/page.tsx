import { Camera, Sparkles } from "lucide-react";
import FoodScanner from "@/components/food/FoodScanner";

export default function FoodScannerPage() {
  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <div className="container-premium pt-24 pb-12">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 shadow-lg shadow-orange-500/10">
              <Camera className="h-7 w-7 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 sm:text-3xl">ماسح الطعام الذكي</h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <Sparkles className="h-3.5 w-3.5 text-fitnix" />
                صور طعامك واحسب سعراته وبروتينه بالذكاء الاصطناعي
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-lg shadow-gray-200/50 sm:p-8">
            <FoodScanner />
          </div>
        </div>
      </div>
    </div>
  );
}
