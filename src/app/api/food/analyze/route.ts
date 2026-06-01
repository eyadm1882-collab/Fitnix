import { NextResponse } from "next/server";

const DEEPSEEK_API = "https://api.deepseek.com/v1/chat/completions";
const API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: Request) {
  try {
    const { foodDescription, portionSize } = await request.json();

    if (!API_KEY) {
      return NextResponse.json({ error: "AI not configured" }, { status: 500 });
    }

    const prompt = `أنت خبير تغذية وتحليل طعام. حلل الوجبة التالية وقدم تحليلًا غذائيًا دقيقًا باللغة العربية.

الوجبة: ${foodDescription || "غير محددة"}
الحجم التقريبي: ${portionSize || "حصة متوسطة"}

قم بإرجاع النتيجة بتنسيق JSON فقط:
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

    const response = await fetch(DEEPSEEK_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "أنت خبير تغذية دقيق. رد فقط بـ JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Food analysis error:", error);
      return NextResponse.json({ error: "Analysis failed" }, { status: 502 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let analysis;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    } catch {
      analysis = null;
    }

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
  } catch (error) {
    console.error("Food API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
