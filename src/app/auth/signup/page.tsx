export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-light-bg p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-gray-900">إنشاء حساب</h1>
            <p className="mt-2 text-gray-500">انضم إلى Fitnix وابدأ رحلتك</p>
          </div>
          <p className="text-center text-gray-500">
            لديك حساب بالفعل؟{" "}
            <a href="/auth/login" className="font-bold text-fitnix hover:underline">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
