"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Bot, User, Sparkles, X, ArrowLeft } from "lucide-react";

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
    <div className={`flex flex-col ${fullPage ? "h-[calc(100vh-80px)]" : "h-[500px]"}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fitnix to-fitnix-dark">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900">مدرب Fitnix AI</h3>
              <span className="rounded-md bg-fitnix/10 px-2 py-0.5 text-[9px] font-medium text-fitnix">قاعدة المعرفة</span>
            </div>
            <p className="text-[10px] text-fitnix">متصل</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-xl p-2 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && !loading && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fitnix/10 to-fitnix/5">
              <Sparkles className="h-8 w-8 text-fitnix" />
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${
                msg.role === "user" ? "bg-fitnix/10" : "bg-gray-100"
              }`}
            >
              {msg.role === "user" ? (
                <User className="h-4 w-4 text-fitnix" />
              ) : (
                <Bot className="h-4 w-4 text-gray-600" />
              )}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-fitnix to-fitnix-dark text-white"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              {msg.content}
              {msg.role === "assistant" && msg.content === "" && (
                <span className="inline-block h-4 w-2 animate-pulse bg-fitnix rounded-full" />
              )}
            </div>
          </motion.div>
        ))}

        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gray-100">
              <Bot className="h-4 w-4 text-gray-600" />
            </div>
            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <Loader2 className="h-5 w-5 animate-spin text-fitnix" />
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
            className="flex-1 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 outline-none transition-all focus:border-fitnix focus:ring-2 focus:ring-fitnix/20"
            dir="rtl"
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-fitnix to-fitnix-dark text-white shadow-lg transition-all disabled:opacity-40"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="h-5 w-5" />
          </motion.button>
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
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
      >
        {content}
      </motion.div>
    </motion.div>
  );
}
