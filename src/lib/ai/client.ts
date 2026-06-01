const GEMINI_API = "https://generativelanguage.googleapis.com/v1/models";
const MODEL = "gemini-2.0-flash";

function getKey(): string {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not configured");
  return key;
}

interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

function convertMessages(messages: { role: string; content: string }[]): GeminiMessage[] {
  return messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
}

export async function generateContent(
  messages: { role: string; content: string }[],
  systemPrompt?: string
): Promise<string> {
  const body: Record<string, any> = {
    contents: convertMessages(messages),
    generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
  };
  if (systemPrompt) body.systemInstruction = { parts: [{ text: systemPrompt }] };

  const res = await fetch(
    `${GEMINI_API}/${MODEL}:generateContent?key=${getKey()}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API error (${res.status}): ${err}`);
  }

  const data: GeminiResponse = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export async function generateContentStream(
  messages: { role: string; content: string }[],
  systemPrompt?: string
): Promise<ReadableStream> {
  const body: Record<string, any> = {
    contents: convertMessages(messages),
    generationConfig: { temperature: 0.7, maxOutputTokens: 2000 },
  };
  if (systemPrompt) body.systemInstruction = { parts: [{ text: systemPrompt }] };

  const res = await fetch(
    `${GEMINI_API}/${MODEL}:streamGenerateContent?alt=sse&key=${getKey()}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini stream error (${res.status}): ${err}`);
  }

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
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text || "";
              if (text) {
                controller.enqueue(new TextEncoder().encode(
                  `data: ${JSON.stringify({ content: text })}\n\n`
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
  const body: Record<string, any> = {
    contents: convertMessages(messages),
    generationConfig: { temperature: 0.2, maxOutputTokens: 2000 },
  };
  if (systemPrompt) body.systemInstruction = { parts: [{ text: systemPrompt }] };

  const res = await fetch(
    `${GEMINI_API}/${MODEL}:generateContent?key=${getKey()}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini JSON error (${res.status}): ${err}`);
  }

  const data: GeminiResponse = await res.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch {
    return null;
  }
}
