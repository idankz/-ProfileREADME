"use client";

import React, { useState } from "react";
import { X, ExternalLink, Copy, Check, Download } from "lucide-react";
import { GithubIcon } from "../ui/BrandIcons";
import { useToast } from "../ui/Toast";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  markdownContent: string;
  username: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  markdownContent,
  username,
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const validUsername = username.trim() || "your-username";
  const newRepoUrl = `https://github.com/new?name=${encodeURIComponent(
    validUsername
  )}&description=My+GitHub+Profile+README&public=true`;
  const existingRepoUrl = `https://github.com/${encodeURIComponent(validUsername)}/${encodeURIComponent(
    validUsername
  )}/edit/main/README.md`;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl p-5 z-10 space-y-4 animate-in zoom-in-95 duration-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-200">
              <GithubIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Deploy to GitHub Profile
              </h3>
              <p className="text-xs text-zinc-400">
                Steps to publish your customized README
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 p-1 rounded hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-2.5 text-xs text-zinc-300">
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
            <span className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 font-semibold flex items-center justify-center shrink-0 text-[11px]">
              1
            </span>
            <div className="space-y-1.5 flex-1">
              <div className="font-medium text-zinc-200">Create the Special Repository</div>
              <p className="text-zinc-400 text-[11px]">
                Repository name must match your username:{" "}
                <code className="px-1 py-0.5 rounded bg-zinc-900 text-zinc-200 font-mono">
                  {validUsername}/{validUsername}
                </code>
              </p>
              <a
                href={newRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Open GitHub: Create Repository</span>
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
            <span className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 font-semibold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <div className="space-y-1">
              <div className="font-medium text-zinc-200">Set Public & Add README</div>
              <p className="text-zinc-400 text-[11px]">
                Select <strong className="text-zinc-200">Public</strong> and check{" "}
                <strong className="text-zinc-200">&quot;Add a README file&quot;</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
            <span className="w-5 h-5 rounded bg-zinc-800 text-zinc-300 font-semibold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <div className="space-y-2 flex-1">
              <div className="font-medium text-zinc-200">Paste & Commit README.md</div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-zinc-400" />
                      <span>Copy Markdown</span>
                    </>
                  )}
                </button>
                <a
                  href={existingRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 text-xs transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-zinc-400" />
                  <span>Edit on GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download file</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
