import { NextResponse } from "next/server";
import { generateJSON } from "@/lib/ai/client";

export async function POST(request: Request) {
  try {
    const { foodDescription, portionSize } = await request.json();

    const userMessage = `حلل الوجبة التالية:

الوجبة: ${foodDescription || "غير محددة"}
الحجم التقريبي: ${portionSize || "حصة متوسطة"}`;

    const systemPrompt = `أنت خبير تغذية وتحليل طعام. حلل الوجبة وقدم تحليلًا غذائيًا دقيقًا باللغة العربية.

أعد النتيجة بتنسيق JSON فقط:
{
  "foodName": "اسم الوجبة",
  "calories": number (إجمالي السعرات),
  "protein": number (البروتين بالجرام),
  "carbs": number (الكربوهيدرات بالجرام),
  "fats": number (الدهون بالجرام),
  "fiber": number (الألياف بالجرام),
  "sugar": number (السكر بالجرام),
  "servingSize": "حجم الحصة",
  "mealType": "فطور | غداء | عشاء | وجبة خفيفة",
  "healthScore": number (1-10, تقييم صحي),
  "tips": ["نصيحة 1", "نصيحة 2"],
  "ingredients": ["مكون 1", "مكون 2"]
}`;

    const analysis = await generateJSON<{
      foodName: string;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
      fiber: number;
      sugar: number;
      servingSize: string;
      mealType: string;
      healthScore: number;
      tips: string[];
      ingredients: string[];
    }>([{ role: "user", content: userMessage }], systemPrompt);

    return NextResponse.json({
      analysis: analysis || {
        foodName: foodDescription || "وجبة",
        calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0,
        servingSize: portionSize || "حصة",
        mealType: "وجبة خفيفة",
        healthScore: 5,
        tips: ["حاول إضافة خضروات للوجبة"],
        ingredients: [],
      },
    });
  } catch (error: any) {
    console.error("Food API error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
