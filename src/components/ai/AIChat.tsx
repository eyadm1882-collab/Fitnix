"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User, Sparkles, X } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  initialContext?: string;
  onClose?: () => void;
  fullPage?: boolean;
}

export default function AIChat({ initialContext, onClose, fullPage = false }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialContext) {
      setMessages([{ role: "user", content: initialContext }]);
      sendMessage(initialContext);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || loading) return;

    const userMessage: Message = { role: "user", content: messageText };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) throw new Error("API error");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = { ...updated[updated.length - 1] };
                last.content += data.content;
                updated[updated.length - 1] = last;
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "عذراً، حدث خطأ في الاتصال. حاول مرة أخرى." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div className={`flex flex-col ${fullPage ? "h-[calc(100vh-200px)] min-h-[400px]" : "h-[450px]"}`}>
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && !loading && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5">
              <Sparkles className="h-7 w-7 text-fitnix" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">مدرب Fitnix AI</h3>
            <p className="max-w-xs text-sm text-gray-500">
              اسألني عن أي شيء يخص التمارين، التغذية، أو هدفك الرياضي
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
              msg.role === "user" ? "bg-fitnix/10" : "bg-gray-100"
            }`}>
              {msg.role === "user" ? (
                <User className="h-4 w-4 text-fitnix" />
              ) : (
                <Bot className="h-4 w-4 text-gray-600" />
              )}
            </div>
            <div className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-fitnix text-white"
                : "bg-gray-50 text-gray-700"
            }`}>
              {msg.content}
              {msg.role === "assistant" && msg.content === "" && (
                <span className="inline-block h-3.5 w-1.5 animate-pulse bg-fitnix rounded-full" />
              )}
            </div>
          </motion.div>
        ))}

        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100">
              <Bot className="h-4 w-4 text-gray-600" />
            </div>
            <div className="rounded-xl bg-gray-50 px-4 py-2.5">
              <Loader2 className="h-4 w-4 animate-spin text-fitnix" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اسأل مدرب Fitnix AI..."
            className="input flex-1"
            dir="rtl"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-fitnix text-white shadow-sm transition-all hover:shadow-md disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );

  if (fullPage) return content;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
        initial={{ y: 24, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.97 }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}
