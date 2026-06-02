import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-light-bg to-white p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/50">
          <div className="mb-8 text-center">
            <Link href="/" className="mb-4 inline-block text-2xl font-black text-fitnix">Fitnix</Link>
            <h1 className="mt-2 text-3xl font-black text-gray-900">إنشاء حساب</h1>
            <p className="mt-2 text-gray-500">انضم إلى Fitnix وابدأ رحلتك</p>
          </div>
          <p className="rounded-2xl bg-fitnix/5 p-4 text-center text-sm text-gray-600">
            قم بتحميل التطبيق من متجر أبل او جوجل بلاي للتسجيل والبدء
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-fitnix bg-fitnix/5 py-3.5 text-sm font-bold text-fitnix transition-all hover:bg-fitnix/10"
            >
              لدي حساب بالفعل — تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
