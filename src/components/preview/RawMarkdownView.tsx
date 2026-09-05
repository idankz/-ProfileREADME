"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "../ui/Toast";

interface RawMarkdownViewProps {
  content: string;
}

export const RawMarkdownView: React.FC<RawMarkdownViewProps> = ({ content }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const lines = content.split("\n");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      showToast("Raw markdown copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy", "error");
    }
  };

  return (
    <div className="relative rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-xs overflow-hidden flex flex-col h-full shadow-md">
      {/* Top Code Status Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-400 font-sans font-medium">
            README.md — Raw Markdown
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code with Line Numbers */}
      <div className="flex-1 overflow-auto p-3 custom-scrollbar flex">
        {/* Line Numbers Column */}
        <div className="select-none text-zinc-600 text-right pr-3 border-r border-zinc-800/80 mr-3 shrink-0">
          {lines.map((_, i) => (
            <div key={i} className="leading-5">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Content Column */}
        <pre className="text-zinc-300 flex-1 whitespace-pre leading-5 selection:bg-zinc-700 selection:text-white">
          {content}
        </pre>
      </div>

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-t border-zinc-800 text-[10px] text-zinc-500 font-sans shrink-0">
        <span>Lines: {lines.length}</span>
        <span>Characters: {content.length}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};
