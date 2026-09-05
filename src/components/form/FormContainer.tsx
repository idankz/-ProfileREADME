"use client";

import React, { useState } from "react";
import { User, Cpu, BarChart3, Share2, Blocks } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { PersonalSection } from "./PersonalSection";
import { TechStackSection } from "./TechStackSection";
import { StatsSection } from "./StatsSection";
import { SocialSection } from "./SocialSection";
import { AddonsSection } from "./AddonsSection";

const SECTIONS = [
  { id: "section-personal", label: "Bio", icon: User },
  { id: "section-tech", label: "Skills", icon: Cpu },
  { id: "section-stats", label: "Stats", icon: BarChart3 },
  { id: "section-socials", label: "Socials", icon: Share2 },
  { id: "section-addons", label: "Extras", icon: Blocks },
];

export const FormContainer: React.FC = () => {
  const { personal, techStack, stats, socials, addons } = useProfileStore();
  const [activeTab, setActiveTab] = useState("section-personal");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const enabledCount = [
    personal.enabled,
    techStack.enabled,
    stats.enabled,
    socials.enabled,
    addons.enabled,
  ].filter(Boolean).length;

  return (
    <div className="w-full lg:w-[45%] h-full flex flex-col border-r border-zinc-800 bg-zinc-950">
      {/* Sticky Navigation Subheader */}
      <div className="sticky top-0 z-20 px-4 sm:px-6 py-3 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-sm flex items-center justify-between gap-2">
        {/* Quick jump navigation tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  isActive
                    ? "bg-zinc-800 text-zinc-100 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-zinc-400" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status count */}
        <div className="text-xs text-zinc-400 font-mono shrink-0">
          <span className="text-zinc-200 font-medium">{enabledCount}</span>
          <span className="text-zinc-500">/5 on</span>
        </div>
      </div>

      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 custom-scrollbar">
        <PersonalSection />
        <TechStackSection />
        <StatsSection />
        <SocialSection />
        <AddonsSection />
      </div>
    </div>
  );
};
