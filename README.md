<div align="center">

# ProfileREADME.dev 🚀

**A modern, responsive web application for developers to build, customize, and export professional GitHub Profile READMEs with an interactive live preview.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=flat-square)](https://github.com/pmndrs/zustand)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Report Bug](https://github.com/idankz/-ProfileREADME/issues) · [Request Feature](https://github.com/idankz/-ProfileREADME/issues)

</div>

---

## ✨ Features

- **Split-Screen Studio**: 45% modular form panel on the left, 55% authentic GitHub dark live preview on the right.
- **1-Click Template Presets**: Instantly switch between pre-configured developer personas:
  - *Full-Stack Pro*
  - *Minimalist Developer*
  - *DevOps & Cloud Engineer*
  - *AI & Data Engineer*
- **Comprehensive Tech Stack Selector**:
  - Over 60+ categorized languages, frameworks, databases, and cloud tools.
  - Multi-style badge rendering: **SkillIcons.dev** (vector icons), **Shields.io Flat**, **Shields.io Large (For-The-Badge)**.
  - Custom skill creator with hex color and slug support.
  - Dismissible active skill chips with 1-click removal.
- **Dynamic GitHub Stats & Metrics**:
  - Real-time GitHub username query.
  - Stats Overview card, Top Languages card (Compact vs Detailed), Contribution Streak stats, and Achievement Trophies.
  - 8 sleek card themes (`github_dark`, `tokyonight`, `radical`, `dracula`, `minimal`, etc.).
  - Profile Views counter badge (`komarev.com`).
- **Social Media & Developer Badges**:
  - Official branded shields for GitHub, LinkedIn, X/Twitter, Portfolio, Discord, YouTube, Twitch, Dev.to, Medium, and Email.
  - Stats, top-language and trophy cards are off by default because their shared public services are currently unavailable. The streak card works.
- **Add-on Blocks**:
  - Daily rotating developer quote widget.
  - Recent blog posts list builder.
  - Open-source sponsor badge (GitHub Sponsors, Buy Me a Coffee, Ko-fi).
  - Custom freeform markdown box.
- **Real-World GitHub Compatibility**:
  - Generates 100% compliant GitHub Flavored Markdown (GFM).
  - Clean native markdown for standard alignment and sanitized HTML for centered layouts.
  - Zero raw syntax breakage.
- **Developer Aesthetic**:
  - Linear/Vercel-inspired monochrome dark design (`#09090b` canvas, `#18181b` cards, `#27272a` subtle borders).
  - Instant clipboard copy with feedback toasts, `.md` file download, and step-by-step GitHub deployment modal.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with post-mount SSR hydration safety and `localStorage` persistence
- **Markdown Processing**: [`react-markdown`](https://github.com/remarkjs/react-markdown) + [`remark-gfm`](https://github.com/remarkjs/remark-gfm)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Brand SVGs

---

## 🚀 Getting Started

### Prerequisites
- [Node.js 18+](https://nodejs.org/) installed
- `npm`, `pnpm`, or `bun`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/idankz/-ProfileREADME.git profilereadme-dev
   cd profilereadme-dev
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Project Structure

```
profilereadme-dev/
├── src/
│   ├── app/
│   │   ├── globals.css         # Minimalist theme styling & custom scrollbars
│   │   ├── layout.tsx          # Root HTML layout & ToastProvider
│   │   └── page.tsx            # Main split-screen application layout
│   ├── components/
│   │   ├── Navbar.tsx          # 1-Click preset switcher, brand, and actions
│   │   ├── form/
│   │   │   ├── AddonsSection.tsx     # Blog posts, quote, sponsor badges
│   │   │   ├── FormContainer.tsx     # Quick-jump anchor navigation
│   │   │   ├── PersonalSection.tsx   # Bio, role, location, typing SVG
│   │   │   ├── SectionWrapper.tsx    # Clean collapsible card primitive
│   │   │   ├── SocialSection.tsx     # Social links & branded badges
│   │   │   ├── StatsSection.tsx      # GitHub metrics & streak cards
│   │   │   └── TechStackSection.tsx  # Skill selector & active chips
│   │   ├── preview/
│   │   │   ├── ExportModal.tsx       # Deployment modal to github.com/username
│   │   │   ├── MarkdownRenderer.tsx  # GitHub-styled markdown preview
│   │   │   ├── PreviewContainer.tsx  # Authentic GitHub dark card container
│   │   │   ├── PreviewHeader.tsx     # Tab toggle (Preview / README) & copy
│   │   │   └── RawMarkdownView.tsx   # Syntax-highlighted code editor view
│   │   └── ui/
│   │       ├── BrandIcons.tsx        # High-contrast monochrome SVG marks
│   │       ├── Switch.tsx            # Tactile monochrome toggle
│   │       └── Toast.tsx             # Minimalist feedback toast
│   ├── lib/
│   │   ├── defaultProfile.ts   # Initial state & 4 developer presets
│   │   ├── markdownGenerator.ts# GFM Markdown compilation engine
│   │   └── skillsData.ts       # 60+ categorized tech badges & metadata
│   ├── store/
│   │   └── useProfileStore.ts  # Zustand store with post-mount hydration
│   └── types/
│       └── profile.ts          # Strictly typed TypeScript interfaces
├── public/                     # Static icons and fonts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
