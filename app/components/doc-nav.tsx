"use client";

import React from "react";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bio } from "@/data/constants";

type IconProps = React.SVGProps<SVGSVGElement>;

const Icons = {
  gitHub: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="12" fill="#f6f8fa" />
      <path
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        fill="#24292f"
      />
    </svg>
  ),
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M6.5 8.5V17.5H4V8.5H6.5ZM5.25 7.25C6.08 7.25 6.75 6.58 6.75 5.75C6.75 4.92 6.08 4.25 5.25 4.25C4.42 4.25 3.75 4.92 3.75 5.75C3.75 6.58 4.42 7.25 5.25 7.25Z"
        fill="white"
      />
      <path
        d="M9 8.5V17.5H11.5V12.75C11.5 11.5 12.5 10.5 13.75 10.5C15 10.5 16 11.5 16 12.75V17.5H18.5V12.25C18.5 9.9 16.6 8 14.25 8C13.1 8 12.1 8.5 11.5 9.25V8.5H9Z"
        fill="white"
      />
    </svg>
  ),
  mail: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" fill="var(--primary)" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="white" />
    </svg>
  ),
};

const SOCIALS = [
  {
    href: Bio.github,
    label: "GitHub",
    icon: Icons.gitHub,
  },
  {
    href: Bio.linkedin,
    label: "LinkedIn",
    icon: Icons.linkedin,
  },
  {
    href: `mailto:${Bio.email}`,
    label: "Email",
    icon: Icons.mail,
  },
];

export default function DockNav() {
  return (
    <TooltipProvider>
      <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <Dock direction="middle">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <DockIcon key={label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full h-full"
                    >
                      <Icon className="size-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-black/90 text-white border-white/20 backdrop-blur-xl rounded-lg px-3 py-1.5 text-sm font-medium"
                  >
                    {label}
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </div>
      </div>
    </TooltipProvider>
  );
}
