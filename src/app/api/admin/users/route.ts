import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data: pending, error } = await supabase
      .from("pending_users")
      .select("*")
      .order("requested_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ users: pending || [] });
  } catch (error) {
    console.error("Users fetch error:", error);
    return NextResponse.json({ users: [] });
  }
}
