import { NextResponse } from "next/server";
import { generateJSON } from "@/lib/ai/client";

export async function POST(request: Request) {
  try {
    const { frontPhoto, sidePhoto, backPhoto, weight, height, gender } = await request.json();

    const userMessage = `حلل بيانات المستخدم التالية:

- الوزن: ${weight} كجم
- الطول: ${height} سم
- الجنس: ${gender === "male" ? "ذكر" : "أنثى"}

قم بتحليل:
1. تقدير نسبة الدهون (رقم تقريبي)
2. تقدير كتلة العضلات (رقم تقريبي)
3. التناسق البدني (نسبة 1-10)
4. تحليل الوضعية (posture)
5. توزيع الدهون
6. نقاط القوة والضعف
7. توصيات للتحسين
8. ملاحظات عامة`;

    const systemPrompt = `أنت خبير تحليل الجسم واللياقة البدنية. قم بتحليل بيانات المستخدم وقدّم تقريراً مفصلاً باللغة العربية.

أعد النتيجة بتنسيق JSON فقط:
{
  "bodyFatEstimate": number,
  "muscleMassEstimate": number,
  "symmetryScore": number (1-10),
  "postureNotes": "string",
  "fatDistribution": "string",
  "strengthPoints": ["string"],
  "weaknessPoints": ["string"],
  "recommendations": ["string"],
  "generalNotes": "string"
}`;

    const analysis = await generateJSON<{
      bodyFatEstimate: number;
      muscleMassEstimate: number;
      symmetryScore: number;
      postureNotes: string;
      fatDistribution: string;
      strengthPoints: string[];
      weaknessPoints: string[];
      recommendations: string[];
      generalNotes: string;
    }>([{ role: "user", content: userMessage }], systemPrompt);

    return NextResponse.json({
      analysis: analysis || {
        bodyFatEstimate: null,
        muscleMassEstimate: null,
        symmetryScore: null,
        postureNotes: "تعذر التحليل",
        fatDistribution: "غير متوفر",
        strengthPoints: [],
        weaknessPoints: [],
        recommendations: ["حاول التقاط صور أوضح"],
        generalNotes: "تعذر الاتصال بخدمة التحليل",
      },
    });
  } catch (error: any) {
    console.error("Body analysis error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
