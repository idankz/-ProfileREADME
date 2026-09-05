"use client";

import { create } from "zustand";
import {
  ProfileState,
  PersonalInfo,
  TechStackConfig,
  StatsConfig,
  SocialLinksConfig,
  AddonsConfig,
  BlogPost,
  SkillItem,
  TemplatePresetKey,
} from "@/types/profile";
import { DEFAULT_PROFILE_STATE, TEMPLATE_PRESETS } from "@/lib/defaultProfile";

interface ProfileStore extends ProfileState {
  hasHydrated: boolean;
  hydrateFromStorage: () => void;

  // Personal Actions
  updatePersonal: (data: Partial<PersonalInfo>) => void;
  setTypingSvgLines: (lines: string[]) => void;

  // Tech Stack Actions
  updateTechStack: (data: Partial<TechStackConfig>) => void;
  toggleSkill: (skillId: string) => void;
  selectAllSkills: (skillIds: string[]) => void;
  clearAllSkills: () => void;
  addCustomSkill: (skill: SkillItem) => void;
  removeCustomSkill: (skillId: string) => void;

  // Stats Actions
  updateStats: (data: Partial<StatsConfig>) => void;

  // Socials Actions
  updateSocials: (data: Partial<SocialLinksConfig>) => void;

  // Addons Actions
  updateAddons: (data: Partial<AddonsConfig>) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (index: number, post: BlogPost) => void;
  removeBlogPost: (index: number) => void;

  // Global Presets & Management
  applyPreset: (presetKey: TemplatePresetKey) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = "profilereadme_state_v2";

export const useProfileStore = create<ProfileStore>((set) => ({
  ...DEFAULT_PROFILE_STATE,
  hasHydrated: false,

  hydrateFromStorage: () => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          set({
            personal: { ...DEFAULT_PROFILE_STATE.personal, ...(parsed.personal || {}) },
            techStack: { ...DEFAULT_PROFILE_STATE.techStack, ...(parsed.techStack || {}) },
            stats: { ...DEFAULT_PROFILE_STATE.stats, ...(parsed.stats || {}) },
            socials: { ...DEFAULT_PROFILE_STATE.socials, ...(parsed.socials || {}) },
            addons: { ...DEFAULT_PROFILE_STATE.addons, ...(parsed.addons || {}) },
            hasHydrated: true,
          });
          return;
        }
      } catch {}
      set({ hasHydrated: true });
    }
  },

  updatePersonal: (data) => {
    set((state) => {
      const next = { ...state, personal: { ...state.personal, ...data } };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              personal: next.personal,
              techStack: next.techStack,
              stats: next.stats,
              socials: next.socials,
              addons: next.addons,
            })
          );
        } catch {}
      }
      return next;
    });
  },

  setTypingSvgLines: (lines) => {
    set((state) => ({
      personal: { ...state.personal, typingSvgLines: lines },
    }));
  },

  updateTechStack: (data) => {
    set((state) => {
      const next = { ...state, techStack: { ...state.techStack, ...data } };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  },

  toggleSkill: (skillId) => {
    set((state) => {
      const current = state.techStack.selectedSkills;
      const updated = current.includes(skillId)
        ? current.filter((id) => id !== skillId)
        : [...current, skillId];
      const next = {
        ...state,
        techStack: { ...state.techStack, selectedSkills: updated },
      };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  },

  selectAllSkills: (skillIds) => {
    set((state) => ({
      techStack: { ...state.techStack, selectedSkills: skillIds },
    }));
  },

  clearAllSkills: () => {
    set((state) => ({
      techStack: { ...state.techStack, selectedSkills: [] },
    }));
  },

  addCustomSkill: (skill) => {
    set((state) => ({
      techStack: {
        ...state.techStack,
        customSkills: [...state.techStack.customSkills, skill],
        selectedSkills: [...state.techStack.selectedSkills, skill.id],
      },
    }));
  },

  removeCustomSkill: (skillId) => {
    set((state) => ({
      techStack: {
        ...state.techStack,
        customSkills: state.techStack.customSkills.filter((s) => s.id !== skillId),
        selectedSkills: state.techStack.selectedSkills.filter((id) => id !== skillId),
      },
    }));
  },

  updateStats: (data) => {
    set((state) => {
      const next = { ...state, stats: { ...state.stats, ...data } };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  },

  updateSocials: (data) => {
    set((state) => {
      const next = { ...state, socials: { ...state.socials, ...data } };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  },

  updateAddons: (data) => {
    set((state) => {
      const next = { ...state, addons: { ...state.addons, ...data } };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {}
      }
      return next;
    });
  },

  addBlogPost: (post) => {
    set((state) => ({
      addons: {
        ...state.addons,
        blogPosts: [...state.addons.blogPosts, post],
      },
    }));
  },

  updateBlogPost: (index, post) => {
    set((state) => {
      const updated = [...state.addons.blogPosts];
      updated[index] = post;
      return {
        addons: { ...state.addons, blogPosts: updated },
      };
    });
  },

  removeBlogPost: (index) => {
    set((state) => ({
      addons: {
        ...state.addons,
        blogPosts: state.addons.blogPosts.filter((_, i) => i !== index),
      },
    }));
  },

  applyPreset: (presetKey) => {
    const preset = TEMPLATE_PRESETS[presetKey];
    if (preset) {
      set({ ...preset.state });
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(preset.state));
        } catch {}
      }
    }
  },

  resetToDefault: () => {
    set({ ...DEFAULT_PROFILE_STATE });
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  },
}));
