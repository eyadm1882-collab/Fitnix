import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { searchChunks } from "@/lib/rag/chunker";

const DEEPSEEK_API = "https://api.deepseek.com/v1/chat/completions";
const API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!API_KEY) {
      return NextResponse.json({ error: "AI not configured" }, { status: 500 });
    }

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

    const systemMessage = {
      role: "system",
      content: `أنت مدرب Fitnix AI - المدرب الشخصي الذكي باللغة العربية.
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
- استخدم المعرفة المتاحة للإجابة بدقة${knowledgeContext}`,
    };

    const response = await fetch(DEEPSEEK_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [systemMessage, ...messages],
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("DeepSeek API error:", error);
      return NextResponse.json({ error: "AI request failed" }, { status: 502 });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) { controller.close(); return; }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                if (content) {
                  controller.enqueue(new TextEncoder().encode(
                    `data: ${JSON.stringify({ content })}\n\n`
                  ));
                }
              } catch {}
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
