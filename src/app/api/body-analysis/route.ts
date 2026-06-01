import { NextResponse } from "next/server";

const DEEPSEEK_API = "https://api.deepseek.com/v1/chat/completions";
const API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: Request) {
  try {
    const { frontPhoto, sidePhoto, backPhoto, weight, height, gender } = await request.json();

    if (!API_KEY) {
      return NextResponse.json({ error: "AI not configured" }, { status: 500 });
    }

    const prompt = `أنت خبير تحليل الجسم واللياقة البدنية. حلل البيانات التالية وقدّم تقريراً مفصلاً باللغة العربية.

معلومات المستخدم:
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
8. ملاحظات عامة

قدم الإجابة بتنسيق JSON:
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

    const response = await fetch(DEEPSEEK_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: "أنت خبير تحليل الجسم واللياقة البدنية." }, { role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("DeepSeek analysis error:", error);
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
        bodyFatEstimate: null,
        muscleMassEstimate: null,
        symmetryScore: null,
        postureNotes: "تعذر التحليل",
        fatDistribution: "غير متوفر",
        strengthPoints: [],
        weaknessPoints: [],
        recommendations: ["حاول التقاط صور أوضح"],
        generalNotes: content.slice(0, 500),
      },
    });
  } catch (error) {
    console.error("Body analysis error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
