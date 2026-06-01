import { NextResponse } from "next/server";
import { generateMealPlan } from "@/lib/nutrition/meal-planner";

export async function POST(request: Request) {
  try {
    const input = await request.json();
    const plan = generateMealPlan(input);
    return NextResponse.json({ plan });
  } catch (error) {
    console.error("Meal plan error:", error);
    return NextResponse.json({ error: "Failed to generate meal plan" }, { status: 500 });
  }
}
