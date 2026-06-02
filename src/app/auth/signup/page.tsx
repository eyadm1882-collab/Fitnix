import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-light-bg to-white p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
          <div className="mb-6 text-center">
            <Link href="/" className="inline-block text-2xl font-black text-fitnix mb-1">Fitnix</Link>
            <h1 className="text-2xl font-black text-gray-900">إنشاء حساب</h1>
            <p className="mt-1 text-sm text-gray-500">انضم إلى Fitnix وابدأ رحلتك</p>
          </div>
          <p className="rounded-xl bg-fitnix/5 border border-fitnix/10 p-3 text-center text-sm text-gray-600">
            قم بتحميل التطبيق من متجر أبل أو جوجل بلاي للتسجيل والبدء
          </p>
          <div className="mt-4">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-fitnix bg-fitnix/5 py-3 text-sm font-bold text-fitnix transition-all hover:bg-fitnix/10"
            >
              لدي حساب بالفعل — تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
