import { MessageCircle } from "lucide-react";
import type { ChatMessageData } from "../../types/chat";

interface ChatMessageProps {
  msg: ChatMessageData;
  isLast: boolean;
  isEarly: boolean;
  children?: React.ReactNode;
}

export default function ChatMessage({ msg, children }: ChatMessageProps) {
  if (msg.sender === "bot") {
    return (
      <div className="flex gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 mt-0.5">
          <MessageCircle className="h-3.5 w-3.5 text-brand" />
        </div>
        <div className="max-w-[80%] space-y-2.5">
          <p className="text-sm leading-relaxed text-slate-700">
            {msg.text}
          </p>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-br-md bg-brand px-4 py-2.5">
        <p className="text-sm leading-relaxed text-white">{msg.text}</p>
      </div>
    </div>
  );
}
