"use client";

import clsx from "clsx";

type BrandLogoProps = {
  context: "navbar" | "footer";
  className?: string;
};

const contextStyles: Record<BrandLogoProps["context"], { shell: string; image: string }> = {
  navbar: {
    shell:
      "rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-3 py-2 shadow-[0_14px_40px_-24px_rgba(37,99,235,0.75)] backdrop-blur-md",
    image: "h-10 w-auto lg:h-11",
  },
  footer: {
    shell:
      "rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 shadow-[0_18px_50px_-24px_rgba(6,182,212,0.55)] backdrop-blur-md",
    image: "h-12 w-auto",
  },
};

export function BrandLogo({ context, className }: BrandLogoProps) {
  const styles = contextStyles[context];

  return (
    <span
      className={clsx(
        "group relative inline-flex items-center overflow-hidden",
        styles.shell,
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(37,99,235,0.22),transparent_45%),radial-gradient(circle_at_right_center,rgba(6,182,212,0.16),transparent_40%)] opacity-80" />
      <span className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-nav.png"
        alt="SoftGroup"
        className={clsx("relative z-10 drop-shadow-[0_8px_24px_rgba(15,23,42,0.35)]", styles.image)}
      />
    </span>
  );
}

export type { BrandLogoProps };
