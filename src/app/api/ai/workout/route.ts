import { NextResponse } from "next/server";
import { generateWorkoutPlan, type DayName, type Goal, type Location } from "@/lib/ai/workout-generator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { days, goal, location } = body;

    if (!days || !goal || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const workout = generateWorkoutPlan(days as DayName[], goal as Goal, location as Location);

    return NextResponse.json({ workout });
  } catch (error) {
    console.error("Workout generation error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
