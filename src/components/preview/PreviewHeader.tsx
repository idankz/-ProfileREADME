"use client";

import React, { useState } from "react";
import { Copy, Check, Download, ExternalLink, Eye, Code } from "lucide-react";
import { useToast } from "../ui/Toast";

interface PreviewHeaderProps {
  viewMode: "preview" | "raw";
  onViewModeChange: (mode: "preview" | "raw") => void;
  markdownContent: string;
  onOpenExportModal: () => void;
}

export const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  viewMode,
  onViewModeChange,
  markdownContent,
  onOpenExportModal,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      showToast("Markdown copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Failed to copy", "error");
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "README.md");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Downloaded README.md", "success");
    } catch {
      showToast("Download failed", "error");
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-b border-zinc-800 bg-zinc-950 shrink-0">
      {/* View Mode Toggle: Preview vs Raw */}
      <div className="inline-flex items-center p-0.5 bg-zinc-900 border border-zinc-800 rounded-md">
        <button
          type="button"
          onClick={() => onViewModeChange("preview")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
            viewMode === "preview"
              ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview</span>
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("raw")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
            viewMode === "raw"
              ? "bg-zinc-100 text-zinc-950 font-semibold shadow-sm"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>README.md</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>

        {/* Download Button */}
        <button
          type="button"
          onClick={handleDownload}
          title="Download README.md"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Download</span>
        </button>

        {/* Export Button */}
        <button
          type="button"
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 border border-emerald-500 transition-colors shadow-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Deploy</span>
        </button>
      </div>
    </div>
  );
};
