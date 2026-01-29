"use client";

import { useState } from "react";

const email = "bafnarishit@gmail.com";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="no-print border-t border-border bg-panel px-4 py-3 text-xs font-mono md:px-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted">Status</span>
          <span>Tempe, AZ</span>
          <span className="text-muted">·</span>
          <span>602-815-2575</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a className="hover:text-accent" href={`mailto:${email}`}>
            {email}
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="rounded border border-border bg-panel px-2 py-1 text-[10px] uppercase tracking-wider text-muted hover:text-ink"
          >
            {copied ? "Copied" : "Copy Email"}
          </button>
          <a className="hover:text-accent" href="https://github.com/rbafna1978">
            GitHub
          </a>
          <a className="hover:text-accent" href="https://linkedin.com/in/rishit-bafna">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
