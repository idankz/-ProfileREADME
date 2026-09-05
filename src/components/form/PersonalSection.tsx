"use client";

import React from "react";
import { AlignLeft, AlignCenter, Plus, Trash2 } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { SectionWrapper } from "./SectionWrapper";
import { Switch } from "../ui/Switch";

export const PersonalSection: React.FC = () => {
  const { personal, updatePersonal, setTypingSvgLines } = useProfileStore();

  const handleAddTypingLine = () => {
    setTypingSvgLines([...personal.typingSvgLines, ""]);
  };

  const handleUpdateTypingLine = (index: number, val: string) => {
    const updated = [...personal.typingSvgLines];
    updated[index] = val;
    setTypingSvgLines(updated);
  };

  const handleRemoveTypingLine = (index: number) => {
    setTypingSvgLines(personal.typingSvgLines.filter((_, i) => i !== index));
  };

  return (
    <SectionWrapper
      id="section-personal"
      title="Personal Information"
      description="Bio, headline, roles, location and introductory details"
      enabled={personal.enabled}
      onToggleEnabled={(enabled) => updatePersonal({ enabled })}
      defaultOpen={true}
    >
      <div className="space-y-4 pt-1">
        {/* Alignment & Animated Typing Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Alignment:</span>
            <div className="inline-flex rounded-md bg-zinc-950 p-0.5 border border-zinc-800">
              <button
                type="button"
                onClick={() => updatePersonal({ alignment: "left" })}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  personal.alignment === "left"
                    ? "bg-zinc-200 text-zinc-950 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Left</span>
              </button>
              <button
                type="button"
                onClick={() => updatePersonal({ alignment: "center" })}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                  personal.alignment === "center"
                    ? "bg-zinc-200 text-zinc-950 font-semibold"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
                <span>Center</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={personal.enableTypingSvg}
              onCheckedChange={(checked) => updatePersonal({ enableTypingSvg: checked })}
              id="enable-typing-svg"
              label="Typing Animation"
            />
          </div>
        </div>

        {/* Name & Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={personal.name}
              onChange={(e) => updatePersonal({ name: e.target.value })}
              placeholder="e.g. Developer Name"
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Title / Role
            </label>
            <input
              type="text"
              value={personal.title}
              onChange={(e) => updatePersonal({ title: e.target.value })}
              placeholder="e.g. Full-Stack Engineer"
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
        </div>

        {/* Animated Typing Lines (if enabled) */}
        {personal.enableTypingSvg && (
          <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-300">
                Typing Headline Roles
              </span>
              <button
                type="button"
                onClick={handleAddTypingLine}
                className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white font-medium transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add Line
              </button>
            </div>
            {personal.typingSvgLines.map((line, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 font-mono w-4">{idx + 1}.</span>
                <input
                  type="text"
                  value={line}
                  onChange={(e) => handleUpdateTypingLine(idx, e.target.value)}
                  placeholder={`Role ${idx + 1}...`}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTypingLine(idx)}
                  className="text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Short Bio */}
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Short Bio
          </label>
          <textarea
            rows={2}
            value={personal.bio}
            onChange={(e) => updatePersonal({ bio: e.target.value })}
            placeholder="Brief introduction about your engineering passions and focus..."
            className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors resize-y"
          />
        </div>

        {/* Bullet Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Currently Working On
            </label>
            <input
              type="text"
              value={personal.workingOn}
              onChange={(e) => updatePersonal({ workingOn: e.target.value })}
              placeholder="e.g. Real-time distributed tools"
              className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Currently Learning
            </label>
            <input
              type="text"
              value={personal.learning}
              onChange={(e) => updatePersonal({ learning: e.target.value })}
              placeholder="e.g. Rust & WebAssembly"
              className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Ask Me About
            </label>
            <input
              type="text"
              value={personal.askMeAbout}
              onChange={(e) => updatePersonal({ askMeAbout: e.target.value })}
              placeholder="e.g. Next.js, Cloud, TypeScript"
              className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={personal.location}
              onChange={(e) => updatePersonal({ location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
              className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={personal.contactEmail}
              onChange={(e) => updatePersonal({ contactEmail: e.target.value })}
              placeholder="e.g. alex@example.dev"
              className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1">
              Fun Fact
            </label>
            <input
              type="text"
              value={personal.funFact}
              onChange={(e) => updatePersonal({ funFact: e.target.value })}
              placeholder="e.g. I brew espresso and collect vinyl"
              className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>
        </div>

        {/* Banner URL */}
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">
            Banner Image URL (Optional)
          </label>
          <input
            type="url"
            value={personal.bannerUrl}
            onChange={(e) => updatePersonal({ bannerUrl: e.target.value })}
            placeholder="https://.../banner.png"
            className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>
      </div>
    </SectionWrapper>
  );
};
