"use client";

import clsx from "clsx";
import type { ComponentType } from "react";

type PremiumTone = "brand" | "cyan" | "violet" | "emerald" | "amber" | "rose";
type PremiumSurface = "light" | "dark";
type PremiumSize = "md" | "lg";
type PremiumIconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;

type PremiumIconBadgeProps = {
  icon: PremiumIconComponent;
  tone: PremiumTone;
  surface?: PremiumSurface;
  size?: PremiumSize;
  className?: string;
  iconClassName?: string;
};

const toneStyles: Record<PremiumTone, { gradient: string; ring: string; glow: string; icon: string }> = {
  brand: {
    gradient: "from-brand via-brand-light to-cyan",
    ring: "ring-brand/20",
    glow: "shadow-brand/25",
    icon: "text-white",
  },
  cyan: {
    gradient: "from-cyan via-sky-400 to-brand-light",
    ring: "ring-cyan/20",
    glow: "shadow-cyan/25",
    icon: "text-white",
  },
  violet: {
    gradient: "from-violet via-fuchsia-500 to-brand-light",
    ring: "ring-violet/20",
    glow: "shadow-violet/25",
    icon: "text-white",
  },
  emerald: {
    gradient: "from-emerald-400 via-teal-400 to-cyan",
    ring: "ring-emerald-400/20",
    glow: "shadow-emerald-400/25",
    icon: "text-white",
  },
  amber: {
    gradient: "from-amber-400 via-orange-400 to-yellow-300",
    ring: "ring-amber-400/20",
    glow: "shadow-amber-400/25",
    icon: "text-slate-950",
  },
  rose: {
    gradient: "from-rose-400 via-pink-400 to-violet",
    ring: "ring-rose-400/20",
    glow: "shadow-rose-400/25",
    icon: "text-white",
  },
};

const surfaceStyles: Record<PremiumSurface, { shell: string; inset: string }> = {
  light: {
    shell: "bg-slate-950/[0.02] border-slate-200/80",
    inset: "from-white/90 to-white/45",
  },
  dark: {
    shell: "bg-white/[0.04] border-white/10",
    inset: "from-white/22 to-white/[0.06]",
  },
};

const sizeStyles: Record<PremiumSize, { frame: string; icon: string }> = {
  md: {
    frame: "h-12 w-12 rounded-2xl",
    icon: "h-5 w-5",
  },
  lg: {
    frame: "h-14 w-14 rounded-2xl",
    icon: "h-6 w-6",
  },
};

export function PremiumIconBadge({
  icon: Icon,
  tone,
  surface = "light",
  size = "md",
  className,
  iconClassName,
}: PremiumIconBadgeProps) {
  const toneStyle = toneStyles[tone];
  const surfaceStyle = surfaceStyles[surface];
  const sizeStyle = sizeStyles[size];

  return (
    <span
      data-testid="premium-icon-badge"
      className={clsx(
        "group relative inline-flex items-center justify-center rounded-2xl border bg-gradient-to-br p-[1px] ring-1 shadow-[0_14px_32px_-20px_rgba(15,23,42,0.45)]",
        surfaceStyle.shell,
        toneStyle.gradient,
        toneStyle.ring,
        className
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 rounded-[1.35rem] bg-gradient-to-br opacity-90 blur-md",
          toneStyle.gradient,
          toneStyle.glow
        )}
      />
      <span
        className={clsx(
          "relative z-10 inline-flex items-center justify-center overflow-hidden bg-gradient-to-br shadow-lg",
          sizeStyle.frame,
          toneStyle.gradient
        )}
      >
        <span className={clsx("absolute inset-[1px] rounded-[calc(1rem-1px)] bg-gradient-to-b", surfaceStyle.inset)} />
        <span className="absolute inset-x-2 top-[1px] h-px bg-white/60" />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_38%),radial-gradient(circle_at_70%_75%,rgba(15,23,42,0.18),transparent_42%)]" />
        <Icon
          className={clsx("relative z-10 drop-shadow-[0_6px_18px_rgba(15,23,42,0.25)]", toneStyle.icon, sizeStyle.icon, iconClassName)}
          strokeWidth={1.75}
        />
      </span>
    </span>
  );
}

export type { PremiumIconBadgeProps, PremiumIconComponent, PremiumSize, PremiumSurface, PremiumTone };
