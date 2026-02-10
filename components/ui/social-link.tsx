import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // if you have a cn helper; otherwise remove cn and className merge

type Props = {
  href: string;
  label: string;
  children: React.ReactNode; // icon
  className?: string;
};

export function SocialLink({ href, label, children, className }: Props) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group inline-flex size-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--card)_90%,var(--foreground)_10%)]/20 backdrop-blur",
        "transition-all hover:scale-105 hover:bg-[color-mix(in_oklab,var(--card)_75%,var(--foreground)_25%)]",
        className
      )}
      target="_blank"
      rel="noreferrer"
    >
      <span className="sr-only">{label}</span>
      <div className="opacity-80 transition-opacity group-hover:opacity-100">
        {children}
      </div>
    </Link>
  );
}
