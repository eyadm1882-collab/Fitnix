import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { searchChunks } from "@/lib/rag/chunker";
import { generateContentStream } from "@/lib/ai/client";

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const lastUserMessage = messages.filter((m: any) => m.role === "user").pop();
    let knowledgeContext = "";

    if (lastUserMessage) {
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

        const { data: chunks } = await supabase
          .from("ai_chunks")
          .select("content, document_id")
          .limit(200);

        if (chunks && chunks.length > 0) {
          const { data: documents } = await supabase
            .from("ai_documents")
            .select("id, title");

          const docMap = new Map((documents || []).map((d) => [d.id, d.title]));
          const allChunks = chunks.map((c) => ({
            content: c.content,
            documentTitle: docMap.get(c.document_id) || "Unknown",
          }));

          const relevant = searchChunks(lastUserMessage.content, allChunks, 3);

          if (relevant.length > 0) {
            knowledgeContext = "\n\nالمعرفة المتاحة:\n" + relevant
              .map((r) => `[${r.documentTitle}]: ${r.content}`)
              .join("\n\n");
          }
        }
      } catch {
        console.log("RAG search failed, continuing without knowledge context");
      }
    }

    const systemPrompt = `أنت مدرب Fitnix AI - المدرب الشخصي الذكي باللغة العربية.
شخصيتك: مدرب لياقة نخبة محترف، خبير تغذية وبناء أجسام.
تتحدث العربية بطلاقة واحترافية.
ودود ومشجع ولكن بطريقة احترافية.
تقدم إجابات علمية دقيقة.

قواعد:
- رد فقط على أسئلة اللياقة البدنية والتغذية وبناء الأجسام
- ارفض تقديم أي نصائح ضارة أو خطيرة
- لا تنصح أبداً بالمنشطات أو المحظورات
- شجع على التدريب الصحي والطبيعي
- قدم إجابات منظمة وواضحة
- استخدم أسلوب المدرب المحترف الواثق
- استخدم المعرفة المتاحة للإجابة بدقة${knowledgeContext}`;

    const stream = await generateContentStream(messages, systemPrompt);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: error.message || "Internal error" }, { status: 500 });
  }
}
