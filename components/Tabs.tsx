"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./nav";
import ThemeToggle from "./ThemeToggle";

export default function Tabs() {
  const pathname = usePathname();

  return (
    <div className="no-print hidden border-b border-border bg-panel md:block">
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-6">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-2 rounded-t border border-border px-3 py-1 text-xs font-mono ${
                active
                  ? "bg-bg text-ink shadow-inset"
                  : "bg-panel text-muted hover:text-ink"
              }`}
            >
              <span
                className={`text-[10px] ${
                  active ? "text-green-500" : "text-muted"
                }`}
              >
                ●
              </span>
              {item.label}.md
            </Link>
          );
        })}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
