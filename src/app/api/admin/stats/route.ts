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

    const { count: usersCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    const { count: subscriptionsCount } = await supabase
      .from("subscriptions")
      .select("*", { count: "exact", head: true });

    const { count: pendingCount } = await supabase
      .from("pending_users")
      .select("*", { count: "exact", head: true });

    const { count: activeSubscriptions } = await supabase
      .from("subscriptions")
      .select("*", { count: "exact", head: true })
      .eq("status", "active");

    const { count: documentsCount } = await supabase
      .from("ai_documents")
      .select("*", { count: "exact", head: true });

    const { count: messagesCount } = await supabase
      .from("ai_messages")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      usersCount: usersCount || 0,
      subscriptionsCount: subscriptionsCount || 0,
      pendingCount: pendingCount || 0,
      activeSubscriptions: activeSubscriptions || 0,
      documentsCount: documentsCount || 0,
      messagesCount: messagesCount || 0,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({
      usersCount: 0,
      subscriptionsCount: 0,
      pendingCount: 0,
      activeSubscriptions: 0,
      documentsCount: 0,
      messagesCount: 0,
    });
  }
}
