"use client";

import React, { useState, useMemo } from "react";
import { FileText, Pencil } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { generateMarkdown } from "@/lib/markdownGenerator";
import { PreviewHeader } from "./PreviewHeader";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { RawMarkdownView } from "./RawMarkdownView";
import { ExportModal } from "./ExportModal";

export const PreviewContainer: React.FC = () => {
  const store = useProfileStore();
  const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Re-generate markdown dynamically when any store field changes
  const markdownContent = useMemo(() => {
    return generateMarkdown({
      personal: store.personal,
      techStack: store.techStack,
      stats: store.stats,
      socials: store.socials,
      addons: store.addons,
    });
  }, [
    store.personal,
    store.techStack,
    store.stats,
    store.socials,
    store.addons,
  ]);

  const githubUser = store.stats.username || "username";

  return (
    <div className="w-full lg:w-[55%] h-full flex flex-col bg-black/40 overflow-hidden">
      {/* Action & View Toolbar */}
      <PreviewHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        markdownContent={markdownContent}
        onOpenExportModal={() => setIsExportModalOpen(true)}
      />

      {/* Main Preview Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
        {viewMode === "preview" ? (
          <div className="max-w-4xl mx-auto rounded-lg border border-[#30363d] bg-[#0d1117] shadow-xl overflow-hidden">
            {/* GitHub Card Header Bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] select-none text-xs text-[#8b949e]">
              <div className="flex items-center gap-2 font-mono">
                <FileText className="w-3.5 h-3.5 text-[#8b949e]" />
                <span className="text-[#c9d1d9] font-medium">{githubUser}</span>
                <span className="text-[#8b949e]">/</span>
                <span className="text-[#58a6ff]">README.md</span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#8b949e]">
                <span>Preview</span>
                <div className="border-l border-[#30363d] pl-2 ml-1">
                  <Pencil className="w-3 h-3 text-[#8b949e]" />
                </div>
              </div>
            </div>

            {/* GitHub Profile README Body */}
            <div className="p-6 sm:p-8 bg-[#0d1117]">
              <MarkdownRenderer content={markdownContent} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto h-full min-h-[500px]">
            <RawMarkdownView content={markdownContent} />
          </div>
        )}
      </div>

      {/* Export to GitHub Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        markdownContent={markdownContent}
        username={githubUser}
      />
    </div>
  );
};
