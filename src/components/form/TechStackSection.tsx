"use client";

import React, { useState, useMemo } from "react";
import { Search, Check, Plus, X } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { SectionWrapper } from "./SectionWrapper";
import { AVAILABLE_SKILLS, CATEGORY_LABELS } from "@/lib/skillsData";
import { BadgeStyle, SkillItem } from "@/types/profile";
import { Switch } from "../ui/Switch";

const BADGE_STYLES: { value: BadgeStyle; label: string }[] = [
  { value: "skillicons", label: "Icons" },
  { value: "shields-flat-square", label: "Badges (Flat)" },
  { value: "shields-for-the-badge", label: "Badges (Large)" },
];

export const TechStackSection: React.FC = () => {
  const {
    techStack,
    updateTechStack,
    toggleSkill,
    clearAllSkills,
    addCustomSkill,
  } = useProfileStore();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] = useState<SkillItem["category"]>("tools");
  const [customColor, setCustomColor] = useState("3B82F6");

  // Merge default skills with custom skills
  const allSkills = useMemo(() => {
    return [...AVAILABLE_SKILLS, ...techStack.customSkills];
  }, [techStack.customSkills]);

  // Selected skills lookup
  const selectedSkillsList = useMemo(() => {
    const map = new Map<string, SkillItem>();
    allSkills.forEach((s) => map.set(s.id, s));
    return techStack.selectedSkills
      .map((id) => map.get(id))
      .filter((s): s is SkillItem => Boolean(s));
  }, [allSkills, techStack.selectedSkills]);

  // Filtered skills by search & category
  const filteredSkills = useMemo(() => {
    return allSkills.filter((s) => {
      const matchesCategory = activeCategory === "all" || s.category === activeCategory;
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, activeCategory, search]);

  const handleCreateCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const id = `custom-${Date.now()}`;
    const cleanName = customName.trim();
    const cleanColor = customColor.replace("#", "").trim() || "555555";

    const newSkill: SkillItem = {
      id,
      name: cleanName,
      category: customCategory,
      skilliconsId: cleanName.toLowerCase().replace(/[^a-z0-9]/g, ""),
      shieldsSlug: `${encodeURIComponent(cleanName)}-${cleanColor}`,
      hexColor: cleanColor,
      logoName: cleanName.toLowerCase().replace(/[^a-z0-9]/g, ""),
    };

    addCustomSkill(newSkill);
    setCustomName("");
    setShowAddCustom(false);
  };

  return (
    <SectionWrapper
      id="section-tech"
      title="Tech Stack & Skills"
      description="Languages, frameworks, databases, and development tools"
      enabled={techStack.enabled}
      onToggleEnabled={(enabled) => updateTechStack({ enabled })}
      defaultOpen={true}
    >
      <div className="space-y-4 pt-1">
        {/* Badge Style Segmented Control & Grouping */}
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Badge Style:</span>
            <div className="inline-flex rounded-md bg-zinc-950 p-0.5 border border-zinc-800">
              {BADGE_STYLES.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => updateTechStack({ badgeStyle: b.value })}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    techStack.badgeStyle === b.value
                      ? "bg-zinc-200 text-zinc-950 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={techStack.groupByCategory}
              onCheckedChange={(checked) => updateTechStack({ groupByCategory: checked })}
              id="group-by-category"
              label="Group by Category"
            />
          </div>
        </div>

        {/* Selected Skills Tags Cloud */}
        {selectedSkillsList.length > 0 && (
          <div className="p-3 bg-zinc-900/30 rounded-lg border border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-medium">
                Active Skills ({selectedSkillsList.length})
              </span>
              <button
                type="button"
                onClick={clearAllSkills}
                className="text-[11px] text-zinc-500 hover:text-zinc-300"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar">
              {selectedSkillsList.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: `#${skill.hexColor}` }}
                  />
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => toggleSkill(skill.id)}
                    className="text-zinc-400 hover:text-zinc-100 p-0.5"
                    title={`Remove ${skill.name}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar & Custom Skill Trigger */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 60+ skills (e.g. React, Go, Docker)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowAddCustom(!showAddCustom)}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 transition-colors flex items-center gap-1 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Custom</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-0.5">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
              activeCategory === "all"
                ? "bg-zinc-200 text-zinc-950 font-semibold"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
          >
            All
          </button>
          {(Object.keys(CATEGORY_LABELS) as SkillItem["category"][]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? "bg-zinc-200 text-zinc-950 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Custom Skill Creator Inline */}
        {showAddCustom && (
          <form
            onSubmit={handleCreateCustomSkill}
            className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-lg space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-zinc-200">Add Custom Skill</span>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Skill name (e.g. Bun)"
                className="px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
              <select
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value as SkillItem["category"])}
                className="px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-300 focus:outline-none focus:border-zinc-500"
              >
                {(Object.keys(CATEGORY_LABELS) as SkillItem["category"][]).map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  placeholder="Hex color"
                  className="w-full px-2.5 py-1.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-300 font-mono focus:outline-none focus:border-zinc-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-zinc-200 hover:bg-white text-zinc-950 font-semibold rounded shrink-0 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Skills Selection Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
          {filteredSkills.map((skill) => {
            const isSelected = techStack.selectedSkills.includes(skill.id);
            return (
              <button
                key={skill.id}
                type="button"
                onClick={() => toggleSkill(skill.id)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-md border text-left text-xs transition-all ${
                  isSelected
                    ? "bg-zinc-100 border-zinc-200 text-zinc-950 font-medium shadow-sm"
                    : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: `#${skill.hexColor}` }}
                  />
                  <span className="truncate">{skill.name}</span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-zinc-950 shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};
