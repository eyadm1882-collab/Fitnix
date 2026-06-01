const API_URL = "https://api.deepseek.com/v1/chat/completions";
const MODEL = "deepseek-chat";

function getKey(): string {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) throw new Error("DEEPSEEK_API_KEY not configured");
  return key;
}

async function deepseekFetch(messages: { role: string; content: string }[], systemPrompt?: string, stream = false) {
  const body: Record<string, any> = {
    model: MODEL,
    messages: systemPrompt
      ? [{ role: "system", content: systemPrompt }, ...messages]
      : messages,
    temperature: stream ? 0.7 : 0.2,
    max_tokens: 2000,
    stream,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getKey()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error (${res.status}): ${err}`);
  }

  return res;
}

export async function generateContent(
  messages: { role: string; content: string }[],
  systemPrompt?: string
): Promise<string> {
  const res = await deepseekFetch(messages, systemPrompt, false);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

export async function generateContentStream(
  messages: { role: string; content: string }[],
  systemPrompt?: string
): Promise<ReadableStream> {
  const res = await deepseekFetch(messages, systemPrompt, true);

  return new ReadableStream({
    async start(controller) {
      const reader = res.body?.getReader();
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
      } catch {} finally {
        controller.close();
      }
    },
  });
}

export async function generateJSON<T>(
  messages: { role: string; content: string }[],
  systemPrompt: string
): Promise<T | null> {
  const res = await deepseekFetch(messages, systemPrompt, false);
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content || "";

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch {
    return null;
  }
}
