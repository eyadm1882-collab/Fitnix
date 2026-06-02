import { Camera, Sparkles } from "lucide-react";
import FoodScanner from "@/components/food/FoodScanner";

export default function FoodScannerPage() {
  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <div className="container-premium pt-20 pb-10">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 shadow-sm">
              <Camera className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">ماسح الطعام الذكي</h1>
              <p className="flex items-center gap-1.5 text-sm text-gray-500">
                <Sparkles className="h-3.5 w-3.5 text-fitnix" />
                صور طعامك واحسب سعراته وبروتينه بالذكاء الاصطناعي
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <FoodScanner />
          </div>
        </div>
      </div>
    </div>
  );
}
