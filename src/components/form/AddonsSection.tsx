"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { SectionWrapper } from "./SectionWrapper";
import { Switch } from "../ui/Switch";
import { StatsTheme } from "@/types/profile";

export const AddonsSection: React.FC = () => {
  const {
    addons,
    updateAddons,
    addBlogPost,
    updateBlogPost,
    removeBlogPost,
  } = useProfileStore();

  const handleAddBlog = () => {
    addBlogPost({ title: "", url: "" });
  };

  return (
    <SectionWrapper
      id="section-addons"
      title="Add-ons & Extras"
      description="Blog articles, developer quote, sponsor badge, and custom markdown"
      enabled={addons.enabled}
      onToggleEnabled={(enabled) => updateAddons({ enabled })}
      defaultOpen={true}
    >
      <div className="space-y-3.5 pt-1">
        {/* Random Dev Quote */}
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                Daily Developer Quote
              </span>
              <span className="text-[11px] text-zinc-500">
                Shows a rotating quote on your profile
              </span>
            </div>
            <Switch
              checked={addons.showQuote}
              onCheckedChange={(checked) => updateAddons({ showQuote: checked })}
              id="show-quote"
            />
          </div>

          {addons.showQuote && (
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
              <span className="text-zinc-400">Quote Theme:</span>
              <select
                value={addons.quoteTheme}
                onChange={(e) => updateAddons({ quoteTheme: e.target.value as StatsTheme })}
                className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-zinc-300 text-xs"
              >
                <option value="tokyonight">Tokyo Night</option>
                <option value="github_dark">GitHub Dark</option>
                <option value="radical">Radical</option>
                <option value="dracula">Dracula</option>
                <option value="minimal">Minimalist</option>
              </select>
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                Recent Blog Posts
              </span>
              <span className="text-[11px] text-zinc-500">
                List recent technical articles or guides
              </span>
            </div>
            <Switch
              checked={addons.showRecentBlogs}
              onCheckedChange={(checked) => updateAddons({ showRecentBlogs: checked })}
              id="show-recent-blogs"
            />
          </div>

          {addons.showRecentBlogs && (
            <div className="space-y-2 pt-2 border-t border-zinc-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400 font-medium">Articles List</span>
                <button
                  type="button"
                  onClick={handleAddBlog}
                  className="flex items-center gap-1 text-zinc-300 hover:text-white font-medium text-[11px]"
                >
                  <Plus className="w-3 h-3" />
                  Add Article
                </button>
              </div>

              {addons.blogPosts.map((post, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) =>
                      updateBlogPost(idx, { ...post, title: e.target.value })
                    }
                    placeholder="Article title..."
                    className="w-full sm:w-1/2 px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                  />
                  <input
                    type="url"
                    value={post.url}
                    onChange={(e) =>
                      updateBlogPost(idx, { ...post, url: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full sm:w-1/2 px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeBlogPost(idx)}
                    className="text-zinc-500 hover:text-zinc-300 p-1 self-end sm:self-center"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support & Sponsor Button */}
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                Sponsor & Support Badge
              </span>
              <span className="text-[11px] text-zinc-500">
                Link to your GitHub Sponsor, Ko-fi, or Buy Me a Coffee
              </span>
            </div>
            <Switch
              checked={addons.showSponsorButton}
              onCheckedChange={(checked) => updateAddons({ showSponsorButton: checked })}
              id="show-sponsor"
            />
          </div>

          {addons.showSponsorButton && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Platform</label>
                <select
                  value={addons.sponsorPlatform}
                  onChange={(e) =>
                    updateAddons({
                      sponsorPlatform: e.target.value as "github" | "buymeacoffee" | "kofi",
                    })
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded text-zinc-200"
                >
                  <option value="github">GitHub Sponsors</option>
                  <option value="buymeacoffee">Buy Me a Coffee</option>
                  <option value="kofi">Ko-fi</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Username / ID</label>
                <input
                  type="text"
                  value={addons.sponsorUsername}
                  onChange={(e) => updateAddons({ sponsorUsername: e.target.value })}
                  placeholder="octocat"
                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Custom Freeform Markdown */}
        <div className="p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-zinc-200 font-medium block">
                Custom Markdown Freeform
              </span>
              <span className="text-[11px] text-zinc-500">
                Insert any custom markdown or HTML directly
              </span>
            </div>
            <Switch
              checked={addons.customMarkdownEnabled}
              onCheckedChange={(checked) => updateAddons({ customMarkdownEnabled: checked })}
              id="custom-markdown-toggle"
            />
          </div>

          {addons.customMarkdownEnabled && (
            <div className="pt-2 border-t border-zinc-800/80">
              <textarea
                rows={3}
                value={addons.customMarkdown}
                onChange={(e) => updateAddons({ customMarkdown: e.target.value })}
                placeholder="### Custom Section&#10;Write markdown here..."
                className="w-full px-3 py-2 text-xs font-mono bg-zinc-950 border border-zinc-800 rounded-md text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-y"
              />
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};
