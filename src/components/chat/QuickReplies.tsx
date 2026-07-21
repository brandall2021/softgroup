import type { QuickReply } from "../../types/chat";

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (value: string) => void;
}

export default function QuickReplies({ replies, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {replies.map((qr) => (
        <button
          key={qr.value}
          onClick={() => onSelect(qr.value)}
          aria-label={qr.label}
          className="rounded-full border border-brand/20 bg-brand/5 px-3.5 py-1.5 text-xs font-semibold text-brand transition-all hover:bg-brand hover:text-white"
        >
          {qr.label}
        </button>
      ))}
    </div>
  );
}
