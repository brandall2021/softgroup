"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import type { ChatMessageData } from "../../types/chat";
import ChatMessage from "./ChatMessage";
import QuickReplies from "./QuickReplies";
import BudgetMiniForm from "./BudgetMiniForm";
import ChatContactForm from "./ChatContactForm";

const serviceOptions = [
  "Desarrollo Web",
  "Sistemas Informáticos",
  "Inteligencia Artificial",
  "Automatización",
  "Networking e Infraestructura",
  "Cloud & Ciberseguridad",
];

interface ChatWindowProps {
  messages: ChatMessageData[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onQuickReply: (value: string) => void;
  onClose: () => void;
}

export default function ChatWindow({
  messages,
  inputValue,
  onInputChange,
  onSend,
  onQuickReply,
  onClose,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      style={{ minHeight: "300px" }}
      aria-live="polite"
      aria-label="Mensajes del chat"
    >
      {messages.map((msg) => (
        <div key={msg.id}>
          <ChatMessage
            msg={msg}
            isLast={messages.indexOf(msg) === messages.length - 1}
            isEarly={messages.length <= 2}
          >
            {msg.sender === "bot" && msg.type === "services" && (
              <div className="flex flex-wrap gap-1.5">
                {serviceOptions.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center rounded-full bg-brand/5 px-3 py-1 text-xs font-medium text-brand"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {msg.sender === "bot" && msg.type === "form" && <BudgetMiniForm />}

            {msg.sender === "bot" && msg.type === "contact" && (
              <ChatContactForm />
            )}

            {msg.sender === "bot" &&
              msg.type === "text" &&
              messages.indexOf(msg) === messages.length - 1 &&
              messages.length <= 2 && (
                <QuickReplies
                  replies={[
                    { label: "Ver servicios", value: "services" },
                    { label: "Solicitar presupuesto", value: "budget" },
                    { label: "Hablar con un asesor", value: "advisor" },
                  ]}
                  onSelect={onQuickReply}
                />
              )}
          </ChatMessage>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
