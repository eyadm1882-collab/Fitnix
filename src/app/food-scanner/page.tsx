import { Camera } from "lucide-react";
import FoodScanner from "@/components/food/FoodScanner";

export default function FoodScannerPage() {
  return (
    <div className="min-h-screen bg-light-bg" dir="rtl">
      <div className="mx-auto max-w-2xl px-4 pt-24 pb-12 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50">
              <Camera className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900">ماسح الطعام الذكي</h1>
              <p className="text-sm text-gray-500">صور طعامك واحسب سعراته وبروتينه بالذكاء الاصطناعي</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
          <FoodScanner />
        </div>
      </div>
    </div>
  );
}
