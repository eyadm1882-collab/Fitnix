import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/onboarding");

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-bg p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-black text-gray-900">تسجيل الدخول</h1>
            <p className="mt-2 text-gray-500">مرحباً بعودتك إلى Fitnix</p>
          </div>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-gray-500">
            ليس لديك حساب؟{" "}
            <a href="/auth/signup" className="font-bold text-fitnix hover:underline">
              إنشاء حساب
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
