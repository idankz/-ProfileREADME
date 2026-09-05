"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "../ui/Switch";

interface SectionWrapperProps {
  id?: string;
  title: string;
  description: string;
  enabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  description,
  enabled,
  onToggleEnabled,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section
      id={id}
      className={`rounded-xl border transition-all duration-150 scroll-mt-20 ${
        enabled
          ? "bg-zinc-900/40 border-zinc-800"
          : "bg-zinc-950/40 border-zinc-850 opacity-60"
      }`}
    >
      {/* Section Header */}
      <div className="p-4 flex items-center justify-between gap-3 select-none">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex-1 cursor-pointer min-w-0"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-100 tracking-tight">
              {title}
            </h3>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
        </div>

        {/* Action controls: Toggle switch & Expand arrow */}
        <div className="flex items-center gap-3 shrink-0">
          <Switch
            checked={enabled}
            onCheckedChange={onToggleEnabled}
            id={`toggle-${title.toLowerCase().replace(/\s+/g, "-")}`}
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md hover:bg-zinc-800 transition-colors"
            title={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Section Body */}
      {isOpen && (
        <div className="px-4 pb-5 pt-1 border-t border-zinc-800/60 space-y-4">
          {children}
        </div>
      )}
    </section>
  );
};
