export type BadgeStyle = "skillicons" | "shields-flat-square" | "shields-for-the-badge" | "shields-plastic";

export type StatsTheme =
  | "github_dark"
  | "tokyonight"
  | "radical"
  | "dark"
  | "dracula"
  | "synthwave"
  | "merko"
  | "gruvbox"
  | "onedark"
  | "minimal";

export type HeaderAlignment = "left" | "center";

export interface SkillItem {
  id: string;
  name: string;
  category: "languages" | "frontend" | "backend" | "database" | "cloud_devops" | "tools";
  skilliconsId: string;
  shieldsSlug: string;
  hexColor: string;
  logoName: string;
}

export interface PersonalInfo {
  enabled: boolean;
  name: string;
  title: string;
  bio: string;
  location: string;
  workingOn: string;
  learning: string;
  askMeAbout: string;
  contactEmail: string;
  funFact: string;
  bannerUrl: string;
  alignment: HeaderAlignment;
  enableTypingSvg: boolean;
  typingSvgLines: string[];
}

export interface TechStackConfig {
  enabled: boolean;
  badgeStyle: BadgeStyle;
  selectedSkills: string[]; // skill IDs
  customSkills: SkillItem[];
  groupByCategory: boolean;
}

export interface StatsConfig {
  enabled: boolean;
  username: string;
  theme: StatsTheme;
  showGeneralStats: boolean;
  showTopLanguages: boolean;
  topLanguagesLayout: "normal" | "compact";
  showStreakStats: boolean;
  showTrophies: boolean;
  showProfileViews: boolean;
  viewsCounterColor: string;
  showPrivateCommits: boolean;
  hideBorder: boolean;
}

export interface SocialLinksConfig {
  enabled: boolean;
  style: "shields-badge" | "text-links";
  github: string;
  linkedin: string;
  twitter: string;
  portfolio: string;
  discord: string;
  youtube: string;
  twitch: string;
  medium: string;
  devto: string;
  email: string;
}

export interface BlogPost {
  title: string;
  url: string;
}

export interface AddonsConfig {
  enabled: boolean;
  showQuote: boolean;
  quoteTheme: StatsTheme;
  showRecentBlogs: boolean;
  blogPosts: BlogPost[];
  showSponsorButton: boolean;
  sponsorPlatform: "buymeacoffee" | "github" | "kofi";
  sponsorUsername: string;
  customMarkdownEnabled: boolean;
  customMarkdown: string;
}

export interface ProfileState {
  personal: PersonalInfo;
  techStack: TechStackConfig;
  stats: StatsConfig;
  socials: SocialLinksConfig;
  addons: AddonsConfig;
}

export type TemplatePresetKey = "fullstack" | "minimalist" | "devops" | "ai_data";
