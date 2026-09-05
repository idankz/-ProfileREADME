"use client";

import React, { useState } from "react";
import { RotateCcw, Sparkles } from "lucide-react";
import { GithubIcon } from "./ui/BrandIcons";
import { useProfileStore } from "@/store/useProfileStore";
import { TEMPLATE_PRESETS } from "@/lib/defaultProfile";
import { TemplatePresetKey } from "@/types/profile";
import { useToast } from "./ui/Toast";

const PRESET_KEYS: { key: TemplatePresetKey; label: string }[] = [
  { key: "fullstack", label: "Full-Stack" },
  { key: "minimalist", label: "Minimalist" },
  { key: "devops", label: "DevOps & Cloud" },
  { key: "ai_data", label: "AI & Data" },
];

export const Navbar: React.FC = () => {
  const { applyPreset, resetToDefault } = useProfileStore();
  const { showToast } = useToast();
  const [activePreset, setActivePreset] = useState<TemplatePresetKey>("fullstack");

  const handleSelectPreset = (key: TemplatePresetKey) => {
    setActivePreset(key);
    applyPreset(key);
    showToast(`Loaded ${TEMPLATE_PRESETS[key].label} template`, "info");
  };

  const handleReset = () => {
    if (confirm("Reset all sections to default values?")) {
      resetToDefault();
      setActivePreset("fullstack");
      showToast("Reset to defaults", "info");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight text-white flex items-center">
              Profile<span className="text-zinc-400 font-normal">README</span>
              <span className="ml-1 text-[11px] text-zinc-500 font-mono">.dev</span>
            </span>
          </div>
        </div>

        {/* Center: 1-Click Quick Template Switcher */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-zinc-900/90 border border-zinc-800 rounded-lg">
          <span className="text-[11px] text-zinc-500 font-medium px-2 flex items-center gap-1 select-none">
            <Sparkles className="w-3 h-3 text-zinc-400" />
            Templates:
          </span>
          {PRESET_KEYS.map(({ key, label }) => {
            const isSelected = activePreset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectPreset(key)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-zinc-100 text-zinc-950 shadow-sm font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Mobile preset selector */}
          <div className="md:hidden">
            <select
              value={activePreset}
              onChange={(e) => handleSelectPreset(e.target.value as TemplatePresetKey)}
              className="px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-300 font-medium"
            >
              {PRESET_KEYS.map(({ key, label }) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            title="Reset to defaults"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
