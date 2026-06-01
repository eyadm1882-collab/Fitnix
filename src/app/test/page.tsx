import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function TestPage() {
  const supabase = await createServerSupabaseClient();

  const { data: todos, error } = await supabase.from("users").select("*").limit(5);

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-bg p-8" dir="rtl">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-black text-gray-900">اختبار الاتصال بقاعدة البيانات</h1>

        {error ? (
          <div className="rounded-2xl bg-red-50 p-6">
            <h2 className="mb-2 font-bold text-red-600">خطأ في الاتصال</h2>
            <p className="text-red-500">{error.message}</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-green-50 p-6">
            <h2 className="mb-2 font-bold text-green-600">✅ تم الاتصال بنجاح</h2>
            <p className="text-green-500">عدد المستخدمين: {todos?.length || 0}</p>
          </div>
        )}

        {todos && todos.length > 0 && (
          <div className="mt-6 space-y-3">
            {todos.map((user: any) => (
              <div key={user.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
