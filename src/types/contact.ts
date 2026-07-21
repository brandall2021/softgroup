import type { LucideIcon } from "lucide-react";

export type FormErrors = {
  nombre?: string;
  email?: string;
  servicio?: string;
  mensaje?: string;
};

export interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
}

export interface ContactFormProps {
  errors: FormErrors;
  touched: Record<string, boolean>;
  mensajeLength: number;
  submitting: boolean;
  cooldownRemaining: number;
  cooldownSeconds: number;
  onBlur: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
  csrfToken: string;
}
