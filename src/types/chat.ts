export interface ChatMessageData {
  id: string;
  sender: "bot" | "user";
  text: string;
  type?: "text" | "services" | "form" | "contact";
}

export interface QuickReply {
  label: string;
  value: string;
}
