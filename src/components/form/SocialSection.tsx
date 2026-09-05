"use client";

import React from "react";
import { Globe, Mail, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon, TwitchIcon } from "../ui/BrandIcons";
import { useProfileStore } from "@/store/useProfileStore";
import { SectionWrapper } from "./SectionWrapper";

export const SocialSection: React.FC = () => {
  const { socials, updateSocials } = useProfileStore();

  const socialInputs = [
    {
      key: "github" as const,
      label: "GitHub",
      placeholder: "octocat",
      icon: <GithubIcon className="w-3.5 h-3.5 text-zinc-400" />,
      value: socials.github,
    },
    {
      key: "linkedin" as const,
      label: "LinkedIn",
      placeholder: "username or URL",
      icon: <LinkedinIcon className="w-3.5 h-3.5 text-zinc-400" />,
      value: socials.linkedin,
    },
    {
      key: "twitter" as const,
      label: "X (Twitter)",
      placeholder: "username",
      icon: <TwitterIcon className="w-3.5 h-3.5 text-zinc-400" />,
      value: socials.twitter,
    },
    {
      key: "portfolio" as const,
      label: "Portfolio URL",
      placeholder: "https://example.dev",
      icon: <Globe className="w-3.5 h-3.5 text-zinc-400" />,
      value: socials.portfolio,
    },
    {
      key: "email" as const,
      label: "Email",
      placeholder: "alex@example.dev",
      icon: <Mail className="w-3.5 h-3.5 text-zinc-400" />,
      value: socials.email,
    },
    {
      key: "discord" as const,
      label: "Discord",
      placeholder: "Invite or handle",
      icon: <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />,
      value: socials.discord,
    },
    {
      key: "youtube" as const,
      label: "YouTube",
      placeholder: "@handle or URL",
      icon: <YoutubeIcon className="w-3.5 h-3.5 text-zinc-400" />,
      value: socials.youtube,
    },
    {
      key: "devto" as const,
      label: "Dev.to",
      placeholder: "username",
      icon: <span className="text-[10px] font-mono text-zinc-400 font-bold">DEV</span>,
      value: socials.devto,
    },
    {
      key: "medium" as const,
      label: "Medium",
      placeholder: "username",
      icon: <span className="text-[10px] font-mono text-zinc-400 font-bold">M</span>,
      value: socials.medium,
    },
    {
      key: "twitch" as const,
      label: "Twitch",
      placeholder: "username",
      icon: <TwitchIcon className="w-3.5 h-3.5 text-zinc-400" />,
      value: socials.twitch,
    },
  ];

  return (
    <SectionWrapper
      id="section-socials"
      title="Social Links & Badges"
      description="Connect your social presence, developer profiles, and website"
      enabled={socials.enabled}
      onToggleEnabled={(enabled) => updateSocials({ enabled })}
      defaultOpen={true}
    >
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {socialInputs.map((input) => (
            <div key={input.key} className="space-y-1">
              <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                {input.icon}
                <span>{input.label}</span>
              </label>
              <input
                type="text"
                value={input.value}
                onChange={(e) => updateSocials({ [input.key]: e.target.value })}
                placeholder={input.placeholder}
                className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-md text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
