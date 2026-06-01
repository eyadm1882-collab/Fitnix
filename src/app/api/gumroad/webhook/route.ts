import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Gumroad webhook received:", body);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Gumroad webhook error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
