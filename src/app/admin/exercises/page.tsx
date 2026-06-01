import ExerciseMediaManager from "@/components/admin/ExerciseMediaManager";
import { Dumbbell } from "lucide-react";

export default function AdminExercisesPage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5">
            <Dumbbell className="h-6 w-6 text-fitnix" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900">إدارة التمارين والوسائط</h1>
            <p className="text-sm text-gray-500">رفع وإدارة صور الجسم وأيقونات العضلات</p>
          </div>
        </div>
      </div>
      <ExerciseMediaManager />
    </div>
  );
}
