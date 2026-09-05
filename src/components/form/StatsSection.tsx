"use client";

import React from "react";
import { GithubIcon } from "../ui/BrandIcons";
import { useProfileStore } from "@/store/useProfileStore";
import { SectionWrapper } from "./SectionWrapper";
import { StatsTheme } from "@/types/profile";
import { Switch } from "../ui/Switch";

const STATS_THEMES: { value: StatsTheme; label: string; previewColor: string }[] = [
  { value: "github_dark", label: "GitHub Dark", previewColor: "#58a6ff" },
  { value: "tokyonight", label: "Tokyo Night", previewColor: "#7aa2f7" },
  { value: "radical", label: "Radical", previewColor: "#fe428e" },
  { value: "dracula", label: "Dracula", previewColor: "#ff79c6" },
  { value: "minimal", label: "Minimalist", previewColor: "#ffffff" },
  { value: "dark", label: "Dark", previewColor: "#79dafa" },
  { value: "onedark", label: "One Dark", previewColor: "#61afef" },
  { value: "gruvbox", label: "Gruvbox", previewColor: "#ebdbb2" },
];

export const StatsSection: React.FC = () => {
  const { stats, updateStats } = useProfileStore();

  return (
    <SectionWrapper
      id="section-stats"
      title="GitHub Stats & Metrics"
      description="Real-time activity stats, contribution streaks, and language breakdown"
      enabled={stats.enabled}
      onToggleEnabled={(enabled) => updateStats({ enabled })}
      defaultOpen={true}
    >
      <div className="space-y-4 pt-1">
        {/* GitHub Username Input */}
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-1.5">
          <label className="block text-xs font-medium text-zinc-300 flex items-center gap-1.5">
            <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />
            <span>GitHub Username</span>
          </label>
          <input
            type="text"
            value={stats.username}
            onChange={(e) => updateStats({ username: e.target.value.trim() })}
            placeholder="e.g. torvalds or octocat"
            className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-md text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono transition-colors"
          />
        </div>

        {/* Theme Palette */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-2">
            Card Color Theme
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {STATS_THEMES.map((theme) => {
              const isSelected = stats.theme === theme.value;
              return (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() => updateStats({ theme: theme.value })}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md border text-xs text-left transition-all ${
                    isSelected
                      ? "bg-zinc-100 border-zinc-200 text-zinc-950 font-medium"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0 border border-black/20"
                    style={{ backgroundColor: theme.previewColor }}
                  />
                  <span className="truncate">{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Cards Toggles */}
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-3">
          {/* General Stats */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                Overview Stats Card
              </span>
              <span className="text-[11px] text-zinc-500">
                Stars, commits, pull requests, issues
              </span>
            </div>
            <Switch
              checked={stats.showGeneralStats}
              onCheckedChange={(checked) => updateStats({ showGeneralStats: checked })}
              id="show-general-stats"
            />
          </div>

          {/* Top Languages */}
          <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2.5">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                Top Languages Card
              </span>
              <span className="text-[11px] text-zinc-500">
                Languages breakdown across repositories
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={stats.topLanguagesLayout}
                onChange={(e) =>
                  updateStats({ topLanguagesLayout: e.target.value as "normal" | "compact" })
                }
                disabled={!stats.showTopLanguages}
                className="px-2 py-0.5 text-[11px] bg-zinc-950 border border-zinc-800 rounded text-zinc-300 disabled:opacity-40"
              >
                <option value="compact">Compact</option>
                <option value="normal">Detailed</option>
              </select>
              <Switch
                checked={stats.showTopLanguages}
                onCheckedChange={(checked) => updateStats({ showTopLanguages: checked })}
                id="show-top-langs"
              />
            </div>
          </div>

          {/* Contribution Streak */}
          <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2.5">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                Contribution Streak
              </span>
              <span className="text-[11px] text-zinc-500">
                Current and longest commit streaks
              </span>
            </div>
            <Switch
              checked={stats.showStreakStats}
              onCheckedChange={(checked) => updateStats({ showStreakStats: checked })}
              id="show-streak"
            />
          </div>

          {/* GitHub Trophies */}
          <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2.5">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                GitHub Trophies
              </span>
              <span className="text-[11px] text-zinc-500">
                Badges for achievements and contributions
              </span>
            </div>
            <Switch
              checked={stats.showTrophies}
              onCheckedChange={(checked) => updateStats({ showTrophies: checked })}
              id="show-trophies"
            />
          </div>

          {/* Profile Views Counter */}
          <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2.5">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                Profile Views Counter
              </span>
              <span className="text-[11px] text-zinc-500">
                Visitor counter badge at the top
              </span>
            </div>
            <Switch
              checked={stats.showProfileViews}
              onCheckedChange={(checked) => updateStats({ showProfileViews: checked })}
              id="show-views-counter"
            />
          </div>
        </div>

        {/* Card Display Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800">
            <span className="text-xs text-zinc-300">Private Commits</span>
            <Switch
              checked={stats.showPrivateCommits}
              onCheckedChange={(checked) => updateStats({ showPrivateCommits: checked })}
              id="show-private-commits"
            />
          </div>
          <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800">
            <span className="text-xs text-zinc-300">Hide Borders</span>
            <Switch
              checked={stats.hideBorder}
              onCheckedChange={(checked) => updateStats({ hideBorder: checked })}
              id="hide-border"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
