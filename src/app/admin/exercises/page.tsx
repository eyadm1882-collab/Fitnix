import ExerciseMediaManager from "@/components/admin/ExerciseMediaManager";
import { Dumbbell } from "lucide-react";

export default function AdminExercisesPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/10">
          <Dumbbell className="h-5 w-5 text-fitnix" />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900">إدارة التمارين والوسائط</h1>
          <p className="text-sm text-gray-500">رفع وإدارة صور الجسم وأيقونات العضلات</p>
        </div>
      </div>
      <ExerciseMediaManager />
    </div>
  );
}
