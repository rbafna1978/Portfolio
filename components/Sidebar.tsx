"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_ITEMS } from "./nav";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="no-print border-b border-border bg-panel md:w-64 md:border-b-0 md:border-r">
      <div className="panel-header hidden md:flex">Explorer</div>
      <div className="flex items-center justify-between px-3 py-2 md:hidden">
        <div className="text-xs font-mono uppercase tracking-wider text-muted">
          portfolio/
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded border border-border bg-panel px-2 py-1 text-xs font-mono text-muted hover:text-ink"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`border-t border-border md:hidden ${open ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col gap-1 p-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded px-2 py-2 text-sm font-mono transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-ink hover:bg-slate-100"
                }`}
              >
                <span className="text-muted">{active ? "▸" : "▹"}</span>
                <span>{item.file}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-3 md:p-4">
        <div className="mb-3 hidden text-xs font-mono uppercase tracking-wider text-muted md:block">
          portfolio/
        </div>
        <nav className="hidden md:flex md:flex-col md:gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded px-2 py-1 text-sm font-mono transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-ink hover:bg-slate-100"
                }`}
              >
                <span className="text-muted">{active ? "▸" : "▹"}</span>
                <span>{item.file}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
